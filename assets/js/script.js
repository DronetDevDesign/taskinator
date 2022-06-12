// button that adds tasks to the "ul"
var formEl = document.querySelector("#task-form");
// variable created for the "ul"
var tasksToDoEl = document.querySelector("#tasks-to-do");

//contains the task function
var createTaskHandler = function(event) {
  //prevent the browser from reloading
  event.preventDefault();

  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  // create "li"
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  // target the "li" with the class "task-item"

  // create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
  // give it a class name
  taskInfoEl.className = "task-info";

  // add HTML content to div
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
  listItemEl.appendChild(taskInfoEl);
  // append the "li" to the "ul"

  // add entire list item to list
  tasksToDoEl.appendChild(listItemEl);
};

// function performed when the button is clicked
formEl.addEventListener("submit", createTaskHandler);
