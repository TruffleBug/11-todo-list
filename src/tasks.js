import {
  editTaskDialog,
  editTaskProject,
  editProjectInput,
  taskTitleOnEditForm,
  editTaskNotes,
  editTaskDueDate,
  editTaskPriority,
} from "./domSelectors.js";
import {
  getProjectsArrayFromLocalStorage,
  updateProjectsArrayInLocalStorage,
} from "./editLocalStorage.js";
import { checkWhichViewStyleIsActive } from "./viewStyle.js";

class Task {
  constructor(taskTitle, notes, project, dueDate, priority) {
    this._taskTitle = taskTitle;
    this._notes = notes;
    this._project = project;
    this._dueDate = dueDate;
    this._priority = priority;
  }

  makeLineItem() {
    const newRow = document.createElement("tr");
    // const table = taskTable();

    Object.values(this).forEach((taskInfo) => {
      const td = document.createElement("td");
      td.textContent = taskInfo;
      newRow.appendChild(td);
    });

    const editButton = document.createElement("button");
    editButton.classList.add("editButton");
    editButton.textContent = "Edit";
    const tdForEditButton = document.createElement("td");
    tdForEditButton.appendChild(editButton);
    newRow.appendChild(tdForEditButton);

    editButton.addEventListener("click", () => {
      while (editTaskProject.children[2]) {
        editTaskProject.removeChild(editTaskProject.children[2]);
      }
      let projectsArray = getProjectsArrayFromLocalStorage();
      projectsArray.forEach((e) => {
        if (e != "None") {
          const option = document.createElement("option");
          option.textContent = e;
          editTaskProject.appendChild(option);
        }
      });
      editTaskDialog.showModal();
      taskTitleOnEditForm.textContent = this._taskTitle;
      editTaskNotes.value = this._notes;
      editTaskProject.value = this._project;
      editTaskDueDate.value = this._dueDate;
      editTaskPriority.value = this._priority;
      editProjectInput.style.display = "none";
    });

    document.addEventListener("DOMContentLoaded", () => {
      editTaskProject.addEventListener("change", () => {
        if (editTaskProject.value === "New Project") {
          editProjectInput.style.display = "block";
        } else {
          editProjectInput.style.display = "none";
        }
      });
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteButton");
    deleteButton.textContent = "Delete";
    const tdForDeleteButton = document.createElement("td");
    tdForDeleteButton.appendChild(deleteButton);
    newRow.appendChild(tdForDeleteButton);

    deleteButton.addEventListener("click", () => {
      localStorage.removeItem(JSON.stringify(this._taskTitle));
      updateProjectsArrayInLocalStorage();
      checkWhichViewStyleIsActive();
    });

    const checkBox = document.createElement("input");
    checkBox.classList.add("checkBox");
    checkBox.type = "checkbox";
    const tdForCheckBox = document.createElement("td");
    tdForCheckBox.appendChild(checkBox);
    newRow.prepend(tdForCheckBox);

    checkBox.addEventListener("click", () => {
      localStorage.removeItem(JSON.stringify(this._taskTitle));
      updateProjectsArrayInLocalStorage();
      checkWhichViewStyleIsActive();
    });

    // table.appendChild(newRow);
    return newRow;
  }
}

export { Task };
