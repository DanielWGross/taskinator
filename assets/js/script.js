const formEl = document.querySelector("#task-form");
const tasksToDoEl = document.querySelector("#tasks-to-do");

const taskFormHandler = (event) => {
  event.preventDefault();
  const taskNameInput = document.querySelector("input[name='task-name']").value;
  const taskTypeInput = document.querySelector("select[name='task-type']")
    .value;

  if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
  }

  formEl.reset();

  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput,
  };
  createTaskEl(taskDataObj);
};

const createTaskEl = (taskDataObj) => {
  const uuidGenerator = (a) =>
    a
      ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
      : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuidGenerator);

  const listItemEl = document.createElement("li");
  listItemEl.setAttribute("data-task-id", uuidGenerator());
  listItemEl.classList.add("task-item");

  const taskInfoEl = document.createElement("div");
  taskInfoEl.classList.add("task-info");

  taskInfoEl.innerHTML = `<h3 class='task-name'>${taskDataObj.name}</h3><span class='task-type'>${taskDataObj.type}</span>`;

  listItemEl.appendChild(taskInfoEl);
  tasksToDoEl.appendChild(listItemEl);
};

formEl.addEventListener("submit", taskFormHandler);
