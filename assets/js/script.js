// button that adds tasks to the "ul"
var formEl = document.querySelector("#task-form");
// variable created for the "ul"
var tasksToDoEl = document.querySelector("#tasks-to-do");

//contains the task function
var createTaskHandler = function(event) {
  //prevent the browser from reloading
  event.preventDefault();

  // create "li"
  var listItemEl = document.createElement("li");
  // target the "li" with the class "task-item"
  listItemEl.className = "task-item";
  // add the text that you need in the new "li"
  listItemEl.textContent = "This is a new task";
  // append the "li" to the "ul"
  tasksToDoEl.appendChild(listItemEl);
};

// function performed when the button is clicked
formEl.addEventListener("submit", createTaskHandler);
