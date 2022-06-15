var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");

// button that adds tasks to the "ul"
var formEl = document.querySelector("#task-form");
// variable created for the "ul"
var tasksToDoEl = document.querySelector("#tasks-to-do");


//contains the task function
var taskFormHandler = function(event) {
  //prevent the browser from reloading
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // package up data as an object
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput
    };

    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
      alert("You need to fill out the task form!");
      return false;
    }
    
    formEl.reset();

    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
};

var createTaskEl = function(taskDataObj) {
  // create "li"
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  // target the "li" with the class "task-item"

  // add task id as a custon attribute
  listItemEl.setAttribute("data-task-id", taskIdCounter);
  
  // create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
  // give it a class name
      taskInfoEl.className = "task-info";
  // add HTML content to div
      taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
      listItemEl.appendChild(taskInfoEl);
  // append the "li" to the "ul"

  var taskActionsEl = createTaskActions(taskIdCounter);
      listItemEl.appendChild(taskActionsEl);

  // add entire list item to list
      tasksToDoEl.appendChild(listItemEl);

  // increase task counter for next unique id
      taskIdCounter++;
};

var createTaskActions = function(taskId) {
      var actionContainerEl = document.createElement("div");
          actionContainerEl.className = "task-actions";

      // create edit button
      var editButtonEl = document.createElement("button");
          editButtonEl.textContent = "Edit";
          editButtonEl.className = "btn edit-btn";
          editButtonEl.setAttribute("data-task-id", taskId);

          actionContainerEl.appendChild(editButtonEl);

      // create delete button
      var deleteButtonEl = document.createElement("button");
          deleteButtonEl.textContent = "Delete";
          deleteButtonEl.className = "btn delete-btn";
          deleteButtonEl.setAttribute("data-task-id", taskId);

          actionContainerEl.appendChild(deleteButtonEl);

      // create a SELECT dropdown menu
      var statusSelectEl = document.createElement("select");
          statusSelectEl.className = "status-select";
          statusSelectEl.setAttribute("name", "status-change");
          statusSelectEl.setAttribute("data-task-id", taskId);

          actionContainerEl.appendChild(statusSelectEl);

      // statusChoices array
      var statusChoices = ["To Do", "In Progress", "Completed"];
      for (var i = 0; i < statusChoices.length; i++) {
      // create option element
      var statusOptionEl = document.createElement("option");
          statusOptionEl.textContent = statusChoices[i];
          statusOptionEl.setAttribute("value", statusChoices[i]);

          // append to select which is the dropdown menu
          statusSelectEl.appendChild(statusOptionEl);
      };

          return actionContainerEl;
    
}
// function performed when the button is clicked
formEl.addEventListener("submit", taskFormHandler);


pageContentEl.addEventListener("click", taskButtonHandler);
