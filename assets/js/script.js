const formEl = document.querySelector("#task-form");
const tasksToDoEl = document.querySelector("#tasks-to-do");

const uuidGenerator = (a) =>
  a
    ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
    : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuidGenerator);

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
  // Generate random Id
  const uuid = uuidGenerator();
  // List Item Element
  const listItemEl = document.createElement("li");
  listItemEl.setAttribute("data-task-id", uuid);
  listItemEl.classList.add("task-item");
  // Task Info Element
  const taskInfoEl = document.createElement("div");
  taskInfoEl.classList.add("task-info");
  taskInfoEl.innerHTML = `<h3 class='task-name'>${taskDataObj.name}</h3><span class='task-type'>${taskDataObj.type}</span>`;
  // Create Task Action Items
  const taskActionsEl = createTaskActions(uuid);
  // Put it all together
  listItemEl.append(taskInfoEl, taskActionsEl);
  tasksToDoEl.appendChild(listItemEl);
};

const createTaskActions = (taskId) => {
  // Action Container Element
  const actionContainerEl = document.createElement("div");
  actionContainerEl.classList.add("task-actions");
  // Edit Button Element
  const editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.classList.add("btn", "edit-btn");
  editButtonEl.setAttribute("data-task-id", taskId);
  // Delete Button Element
  const deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.classList.add("btn", "delete-btn");
  deleteButtonEl.setAttribute("data-task-id", taskId);
  // Status Select Element
  const statusSelectEl = document.createElement("select");
  statusSelectEl.classList.add("select-status");
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);
  // Status Option Elements
  const statusChoices = ["To Do", "In Progress", "Completed"];
  statusChoices.forEach((status) => {
    const statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = status;
    statusOptionEl.setAttribute("value", status);
    statusSelectEl.appendChild(statusOptionEl);
  });
  // Put it all together
  actionContainerEl.append(editButtonEl, deleteButtonEl, statusSelectEl);
  return actionContainerEl;
};

formEl.addEventListener("submit", taskFormHandler);
