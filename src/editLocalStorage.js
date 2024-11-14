import { taskTable } from "./domSelectors.js";

function postStoredTask(newTask) {
  localStorage.setItem(
    JSON.stringify(newTask._taskTitle),
    JSON.stringify(newTask),
  );
  // updates projectsArray in local storage
  // updateProjectsArrayInLocalStorage();
  // let projectsArray = getProjectsArrayFromLocalStorage();
  // projectsArray.push(newTask._project);
  // projectsArray = Array.from(new Set(projectsArray));
  // localStorage.setItem('projectsArray', JSON.stringify(projectsArray))
}

function getStoredTasks() {
  const table = taskTable();
  table.replaceChildren(table.firstElementChild);

  let storedTasks = {};

  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) != "projectsArray") {
      let key = localStorage.key(i);
      let value = localStorage.getItem(key);
      storedTasks[JSON.parse(key)] = Object.values(JSON.parse(value));
    }
  }

  //convert storedTasks object to array
  storedTasks = Object.values(storedTasks);

  console.log("storedTaskArray", storedTasks);

  // storedTasks.forEach((e) => {
  //     const newTask = new Task(e[0], e[1], e[2], e[3], e[4]);
  //     console.log(newTask);
  //     newTask.makeLineItem();
  // });
  return storedTasks;
}

function getProjectsArrayFromLocalStorage() {
  let projectsArray = JSON.parse(localStorage.getItem("projectsArray")) || [];
  return projectsArray;
}

// projects array based on local storage
function updateProjectsArrayInLocalStorage() {
  let storedProjects = [];

  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) != "projectsArray") {
      let value = localStorage.getItem(localStorage.key(i));
      storedProjects.push(JSON.parse(value)["_project"]);
    }
  }

  storedProjects = Array.from(new Set(storedProjects));
  localStorage.setItem("projectsArray", JSON.stringify(storedProjects));

  // BASED ON DOM, BUT CAN'T USE BECAUSE OF CALLSTACK ORDER
  // const shownProjects = document.querySelectorAll('.taskTable td:nth-child(4)');
  // let shownProjectsArray = [];
  // shownProjects.forEach((e) => {
  //     shownProjectsArray.push(e.textContent);
  // });
  // console.log('shownProjectsArray', shownProjectsArray);
  // shownProjectsArray = Array.from(new Set(shownProjectsArray));
  // localStorage.setItem('projectsArray', JSON.stringify(shownProjectsArray));
}

// function getStoredTasks() {
//     const table = taskTable();
//     table.replaceChildren(table.firstElementChild);

//     let storedTasks = {};

//     for (let i = 0; i < localStorage.length; i++) {
//         let key = localStorage.key(i);
//         let value = localStorage.getItem(key);
//         storedTasks[JSON.parse(key)] = Object.values(JSON.parse(value));
//     };

//     //convert storedTasks object to array
//     storedTasks = Object.values(storedTasks)

//     console.log('storedTaskArray', storedTasks)

//     // storedTasks.forEach((task) => makeLineItem(task))
// };

export {
  postStoredTask,
  getStoredTasks,
  getProjectsArrayFromLocalStorage,
  updateProjectsArrayInLocalStorage,
};
