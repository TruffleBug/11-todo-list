import {
  viewAllButton,
  viewByProjectButton,
  newTaskButton,
  newTaskDialog,
  newTaskForm,
  newTaskProject,
  newProjectInput,
  cancelNewButton,
  submitNewButton,
  editTaskForm,
  editTaskDialog,
  cancelEditButton,
  taskTitleOnEditForm,
  submitEditButton,
  content,
} from "./domSelectors.js";
import {
  postStoredTask,
  getProjectsArrayFromLocalStorage,
  updateProjectsArrayInLocalStorage,
} from "./editLocalStorage.js";
import { Task } from "./tasks.js";
import {
  checkWhichViewStyleIsActive,
  viewByProject,
  viewAll,
} from "./viewStyle.js";

function onLoad() {
  // make table heading
  let taskTable = document.createElement("div");
  taskTable.className = "taskTable";
  content.appendChild(taskTable);

  let taskTableHeadingRow = document.createElement("tr");
  taskTable.appendChild(taskTableHeadingRow);

  const taskTableHeadingList = [
    " ",
    "Task",
    "Notes",
    "Project",
    "Date Due",
    "Priority",
    " ",
    " ",
  ];
  taskTableHeadingList.forEach((heading) => {
    const th = document.createElement("th");
    th.textContent = heading;
    taskTableHeadingRow.appendChild(th);
  });

  // event listener for View By Project button
  viewByProjectButton.addEventListener("click", () => {
    viewByProject();
  });

  // event listener for View All button
  viewAllButton.addEventListener("click", () => {
    viewAll();
  });

  // event listener for New Task button
  newTaskButton.addEventListener("click", () => {
    // enter function to make list of existing projects in dropdown menu
    while (newTaskProject.children[2]) {
      newTaskProject.removeChild(newTaskProject.children[2]);
    }
    let projectsArray = getProjectsArrayFromLocalStorage();
    projectsArray.forEach((e) => {
      if (e != "None") {
        const option = document.createElement("option");
        option.textContent = e;
        newTaskProject.appendChild(option);
      }
    });
    newProjectInput.style.display = "none";
    newTaskDialog.showModal();
  });

  // event listener for when New Project is selected
  document.addEventListener("DOMContentLoaded", () => {
    newTaskProject.addEventListener("change", () => {
      if (newTaskProject.value === "New Project") {
        newProjectInput.style.display = "block";
      } else {
        newProjectInput.style.display = "none";
      }
    });
  });

  // event listeners for New Task Dialog
  cancelNewButton.addEventListener("click", () => {
    newTaskForm.reset();
    newTaskDialog.close();
  });

  newTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const taskTitle = newTaskForm.elements.taskTitle.value;
    const notes = newTaskForm.elements.notes.value;

    let project = newTaskForm.elements.project.value;
    if (newTaskForm.elements.newProjectInput.value) {
      project = newTaskForm.elements.newProjectInput.value;
    }

    const dueDate = newTaskForm.elements.dueDate.value;
    const priority = newTaskForm.elements.priority.value;
    const newTask = new Task(taskTitle, notes, project, dueDate, priority);
    postStoredTask(newTask);
    newTaskForm.reset();
    newTaskDialog.close();
    // newTask.makeLineItem();
    updateProjectsArrayInLocalStorage();
    checkWhichViewStyleIsActive();
  });

  // newTaskForm.addEventListener('submit', (event) => {
  //     event.preventDefault();
  //     const formData = new FormData(newTaskForm, submitNewButton);
  //     const data = {};
  //     for (const [key, value] of formData.entries()) {
  //         data[key] = value;
  //     };
  //     localStorage.setItem(JSON.stringify(data.taskTitle), JSON.stringify(data));
  //     newTaskForm.reset();
  //     newTaskDialog.close();
  //     makeLineItem(Object.values(data));
  // });

  newTaskForm.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitNewButton.click();
    }
  });

  newTaskForm.addEventListener("keypress", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      cancelNewButton.click();
      console.log("cancel hit");
    }
  });

  cancelEditButton.addEventListener("click", () => {
    event.preventDefault();
    editTaskForm.reset();
    editTaskDialog.close();
  });

  editTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // console.log('event', event);
    const taskTitle = taskTitleOnEditForm.textContent;
    const notes = editTaskForm.elements.notes.value;
    let project = editTaskForm.elements.project.value;
    if (editTaskForm.elements.editProjectInput.value) {
      project = editTaskForm.elements.editProjectInput.value;
    }
    const dueDate = editTaskForm.elements.dueDate.value;
    const priority = editTaskForm.elements.priority.value;
    const newTask = new Task(taskTitle, notes, project, dueDate, priority);
    postStoredTask(newTask);
    editTaskForm.reset();
    editTaskDialog.close();
    // console.log('newTask notes', newTask._notes);
    // getStoredTasks();
    updateProjectsArrayInLocalStorage();
    checkWhichViewStyleIsActive();
  });

  editTaskForm.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitEditButton.click();
    }
  });
}

export { onLoad };
