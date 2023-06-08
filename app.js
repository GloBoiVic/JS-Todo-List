// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Functions
function addTodo(e) {
  // prevent form default behavior
  e.preventDefault();

  // Create Todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // Create Li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;

  if (todoInput.value === "") {
    return;
  }
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // Add Todos to Local Storage
  saveLocalTodos(todoInput.value);

  // Check completed button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  // Check trash button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add("trash-btn");
  todoDiv.appendChild(deleteButton);

  // Append To Lists
  todoList.appendChild(todoDiv);

  // Clear Todo Inout value
  todoInput.value = "";
}

// Function check to see if delete is clicked
function deleteCheck(e) {
  const item = e.target;

  //Delete Todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    // Wait to animate then remove
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }

  // Check Mark
  if (item.classList[0] === "complete-btn") {
    const toDo = item.parentElement;
    toDo.classList.toggle("completed");
  }
}

// Filter Todos
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incomplete":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// Local storage
function saveLocalTodos(todo) {
  // Check if todos already exists
  let todos;
  if (localStorage.getItem("todos") === null) {
    // If empty, create local array and push new todos in
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Get Todos from local storage

function getTodos() {
  // Check if todos already exists
  let todos;
  if (localStorage.getItem("todos") === null) {
    // If empty, create local array and push new todos in
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach((todo) => {
    // Create Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create Li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // Check completed button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // Check trash button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("trash-btn");
    todoDiv.appendChild(deleteButton);

    // Append To Lists
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  // Check if todos already exists
  let todos;
  if (localStorage.getItem("todos") === null) {
    // If empty, create local array and push new todos in
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);

  localStorage.setItem("todos", JSON.stringify(todos));
}

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);
