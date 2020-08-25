const formEl = document.querySelector("#task-form");
const tasksToDoEl = document.querySelector("#tasks-to-do");

const createTaskHandler = (event) => {
  event.preventDefault();
  const taskNameInput = document.querySelector("input[name='task-name']");
  const taskTypeInput = document.querySelector("select[name='task-type']");

  const listItemEl = document.createElement("li");
  listItemEl.classList.add("task-item");

  const taskInfoEl = document.createElement("div");
  taskInfoEl.classList.add("task-info");
  taskInfoEl.innerHTML = `<h3 class='task-name'>${taskNameInput.value}</h3><span class='task-type'>${taskTypeInput.value}</span>`;

  listItemEl.appendChild(taskInfoEl);
  tasksToDoEl.appendChild(listItemEl);
};

formEl.addEventListener("submit", createTaskHandler);
