const formEl = document.querySelector("#task-form");
const tasksToDoEl = document.querySelector("#tasks-to-do");

const createTaskHandler = (event) => {
  event.preventDefault();
  const taskItemEl = document.createElement("li");
  taskItemEl.textContent = "Hello";
  taskItemEl.classList.add("task-item");
  tasksToDoEl.appendChild(taskItemEl);
};

formEl.addEventListener("submit", createTaskHandler);
