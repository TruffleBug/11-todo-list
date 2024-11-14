import { taskTable } from "./domSelectors";
import {
  getProjectsArrayFromLocalStorage,
  getStoredTasks,
} from "./editLocalStorage";
import { Task } from "./tasks";

function checkWhichViewStyleIsActive() {
  const secondRowOfTaskTable = document.querySelector(
    ".taskTable tr:nth-child(2)",
  );
  console.log("2ND ROW CLASS NAME", secondRowOfTaskTable.className);
  if (secondRowOfTaskTable && secondRowOfTaskTable.className === "projectRow") {
    viewByProject();
  } else {
    viewAll();
  }
}

function viewByProject() {
  console.log("view by project clicked");
  const table = taskTable();
  table.replaceChildren(table.firstElementChild);

  let projectsArray = getProjectsArrayFromLocalStorage();
  let storedTasks = getStoredTasks(); //outputs array

  projectsArray.forEach((project) => {
    const trProject = document.createElement("tr");
    trProject.classList = "projectRow";

    const thProject = document.createElement("th");
    thProject.classList = "projectName";
    thProject.textContent = project;
    thProject.colSpan = "8";
    trProject.appendChild(thProject);

    table.appendChild(trProject);

    // for each task, make row under corresponding project
    storedTasks.forEach((task) => {
      if (task[2] === project) {
        const newTask = new Task(task[0], task[1], task[2], task[3], task[4]);
        // console.log(newTask);
        const taskRow = newTask.makeLineItem();
        table.appendChild(taskRow);
      }
    });
  });
}

function viewAll() {
  console.log("view all clicked");

  const table = taskTable();
  table.replaceChildren(table.firstElementChild);

  let storedTasks = getStoredTasks(); //outputs array

  storedTasks.forEach((task) => {
    const newTask = new Task(task[0], task[1], task[2], task[3], task[4]);
    const taskRow = newTask.makeLineItem();
    table.appendChild(taskRow);
  });
}

export { checkWhichViewStyleIsActive, viewByProject, viewAll };
