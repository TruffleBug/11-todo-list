import "./styles.css";
import { onLoad } from "./runOnLoad.js";
import { formatDistance, subDays } from "date-fns";
import { getStoredTasks } from "./editLocalStorage.js";
import { viewByProject } from "./viewStyle.js";

// let x = new Task('testTaskTitle', '1/1/24');
// console.log(x.title, x.dueDate);

// window.addEventListener('load', () => {
//     const storedData = localStorage.getItem('formData');

//     if (storedData) {
//         const data = JSON.parse(storedData);
//     };
// })

onLoad();
getStoredTasks();
viewByProject();
