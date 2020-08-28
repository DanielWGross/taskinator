const formEl = document.querySelector("#task-form");
const tasksToDoEl = document.querySelector("#tasks-to-do");
const tasksInProgressEl = document.querySelector("#tasks-in-progress");
const tasksCompletedEl = document.querySelector("#tasks-completed");
const pageContentEl = document.querySelector("#page-content");

let tasks = [];

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const uuidGenerator = (a) =>
  a
    ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
    : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuidGenerator);

const taskFormHandler = (event) => {
  event.preventDefault();
  const taskNameInput = document.querySelector("input[name='task-name']").value;
  const taskTypeInput = document.querySelector("select[name='task-type']")
    .value;
  const isEdit = formEl.hasAttribute("data-task-id");

  if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
  }

  formEl.reset();

  if (isEdit) {
    const taskId = formEl.getAttribute("data-task-id");
    const taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
      id: taskId,
    };
    completeEditTask(taskDataObj);
  } else {
    const taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
      status: "to do",
    };
    createTaskEl(taskDataObj);
  }
};

const createTaskEl = (taskDataObj) => {
  // Generate random Id
  const uuid = uuidGenerator();
  // List Item Element
  const listItemEl = document.createElement("li");
  listItemEl.setAttribute("data-task-id", uuid);
  listItemEl.setAttribute("draggable", "true");
  listItemEl.classList.add("task-item");
  // Task Info Element
  const taskInfoEl = document.createElement("div");
  taskInfoEl.classList.add("task-info");
  taskInfoEl.innerHTML = `<h3 class='task-name'>${taskDataObj.name}</h3><span class='task-type'>${taskDataObj.type}</span>`;
  // Create Task Action Items
  const taskActionsEl = createTaskActions(uuid);
  // Put it all together
  listItemEl.append(taskInfoEl, taskActionsEl);
  taskDataObj.id = uuid;
  tasks.push(taskDataObj);
  saveTasks();
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

const deleteTask = (taskId) => {
  const selectedTask = document.querySelector(
    `.task-item[data-task-id='${taskId}']`
  );
  selectedTask.remove();

  tasks = tasks.filter((task) => task.id !== taskId);

  saveTasks();
};

const editTask = (taskId) => {
  const selectedTask = document.querySelector(
    `.task-item[data-task-id='${taskId}']`
  );
  const taskName = selectedTask.querySelector("h3.task-name").textContent;
  const taskType = selectedTask.querySelector("span.task-type").textContent;

  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;
  document.querySelector("#save-task").textContent = "Save Task";
  formEl.setAttribute("data-task-id", taskId);
};

const taskButtonHandler = (event) => {
  if (event.target.matches(".delete-btn")) {
    deleteTask(event.target.dataset.taskId);
  }
  if (event.target.matches(".edit-btn")) {
    editTask(event.target.dataset.taskId);
  }
};

const completeEditTask = (taskDataObj) => {
  const selectedTask = document.querySelector(
    `.task-item[data-task-id='${taskDataObj.id}']`
  );
  selectedTask.querySelector("h3.task-name").textContent = taskDataObj.name;
  selectedTask.querySelector("span.task-type").textContent = taskDataObj.type;

  tasks.forEach((task) => {
    if (task.id === taskDataObj.id) {
      task.name = taskDataObj.name;
      task.type = taskDataObj.type;
    }
  });

  saveTasks();

  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task";
};

const taskStatusChangeHandler = (event) => {
  const taskId = event.target.getAttribute("data-task-id");
  const statusValue = event.target.value.toLowerCase();
  const selectedTask = document.querySelector(
    `.task-item[data-task-id='${taskId}']`
  );

  switch (statusValue) {
    case "to do":
      tasksToDoEl.appendChild(selectedTask);
      break;
    case "in progress":
      tasksInProgressEl.appendChild(selectedTask);
      break;
    default:
      tasksCompletedEl.appendChild(selectedTask);
  }

  tasks.forEach((task) => {
    if (task.id === taskId) {
      task.status = statusValue;
    }
  });

  saveTasks();
};

const dragTaskHandler = (event) => {
  const taskId = event.target.getAttribute("data-task-id");
  event.dataTransfer.setData("text/plain", taskId);
};

const dropZoneHandler = (event) => {
  event.preventDefault();
  const taskListEl = event.target.closest(".task-list");
  if (taskListEl) {
    taskListEl.setAttribute(
      "style",
      "background: rgba(68, 233, 255, 0.7); border-style: dashed;"
    );
  }
};

const dropTaskHandler = (event) => {
  const taskId = event.dataTransfer.getData("text/plain");
  const draggableElement = document.querySelector(
    `.task-item[data-task-id='${taskId}']`
  );
  const dropZoneEl = event.target.closest(".task-list");
  const statusType = dropZoneEl.id;
  const statusSelectEl = draggableElement.querySelector(
    "select[name='status-change']"
  );

  switch (statusType) {
    case "tasks-to-do":
      statusSelectEl.selectedIndex = 0;
      break;
    case "tasks-in-progress":
      statusSelectEl.selectedIndex = 1;
      break;
    case "tasks-completed":
      statusSelectEl.selectedIndex = 2;
      break;
    default:
      return;
  }

  tasks.forEach((task) => {
    if (task.id === taskId) {
      task.status = statusSelectEl.value.toLowerCase();
    }
  });

  saveTasks();

  dropZoneEl.appendChild(draggableElement);
  dropZoneEl.removeAttribute("style");
};

const dragLeaveHandler = (event) => {
  const dropZoneEl = event.target.closest(".task-list");
  if (dropZoneEl) {
    dropZoneEl.removeAttribute("style");
  }
};

formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);
pageContentEl.addEventListener("dragstart", dragTaskHandler);
pageContentEl.addEventListener("dragover", dropZoneHandler);
pageContentEl.addEventListener("drop", dropTaskHandler);
pageContentEl.addEventListener("dragleave", dragLeaveHandler);
