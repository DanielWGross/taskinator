const formEl = document.querySelector("#task-form");
const tasksToDoEl = document.querySelector("#tasks-to-do");

const taskFormHandler = (event) => {
  event.preventDefault();
  var taskDataObj = {
    name: document.querySelector("input[name='task-name']"),
    type: document.querySelector("select[name='task-type']"),
  };
  createTaskEl(taskDataObj);
};

const createTaskEl = (taskDataObj) => {
  const listItemEl = document.createElement("li");
  listItemEl.classList.add("task-item");

  const taskInfoEl = document.createElement("div");
  taskInfoEl.classList.add("task-info");
  taskInfoEl.innerHTML = `<h3 class='task-name'>${taskDataObj.name.value}</h3><span class='task-type'>${taskDataObj.type.value}</span>`;

  listItemEl.appendChild(taskInfoEl);
  tasksToDoEl.appendChild(listItemEl);
};

formEl.addEventListener("submit", taskFormHandler);
