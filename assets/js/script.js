const buttonEl = document.querySelector("#save-task");
const tasksToDoEl = document.querySelector("#tasks-to-do");

const createTaskHandler = () => {
  const taskItemEl = document.createElement("li");
  taskItemEl.textContent = "Hello";
  taskItemEl.classList.add("task-item");
  tasksToDoEl.appendChild(taskItemEl);
};

buttonEl.addEventListener("click", createTaskHandler);
