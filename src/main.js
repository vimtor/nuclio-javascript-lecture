const input = document.querySelector("input");
const form = document.querySelector("form");
const list = document.querySelector("ul");
const error = document.querySelector(".error");
const pending = document.querySelector("span");


function getInitialTasks() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    return storedTasks.split(",");
  }
  updatePendingTasks();
  return [];
}

function createItem(title) {
  const item = document.createElement("li");
  item.innerText = title;
  item.addEventListener("click", () => {
    list.removeChild(item);
    tasks = tasks.filter((task) => task !== title);
    localStorage.setItem("tasks", tasks);
    updatePendingTasks();
  });

  list.append(item);
  updatePendingTasks();
}

function clearInput() {
  input.value = "";
  input.focus();
}

function setError(message) {
  error.innerText = message;
}

function clearError() {
  error.innerText = "";
}

function saveTask(title) {
  tasks.push(title);
  localStorage.setItem("tasks", tasks);
}

function updatePendingTasks(){
  const storedTasks = localStorage.getItem("tasks");
  let storedTasksArray = [];

  if (storedTasks) {
    storedTasksArray = storedTasks.split(",");
    pending.innerText = storedTasksArray.length;
  }
  else{
    pending.innerText = 0;
  }
}


let tasks = getInitialTasks();


tasks.forEach(createItem);



form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (input.value) {
    createItem(input.value);
    saveTask(input.value);
    clearInput();
    clearError();
  } else {
    setError("Your task cannot be empty");
  }
  updatePendingTasks();
});
