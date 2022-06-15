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
    // has data attribute, so get task id and call function to complete edit process

        var isEdit = formEl.hasAttribute("data-task-id");
        if (isEdit) {
            var taskId = formEl.getAttribute("data-task-id");
            completeEditTask(taskNameInput, taskTypeInput, taskId);
        // no data attribute, so create object as normal and pass to createTaskEl function
        } else {
            var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
            };
        };
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
};

var completeEditTask = function(taskName, taskType, taskId) {
// find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");
    
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
};

// function performed when the button is clicked
formEl.addEventListener("submit", taskFormHandler);

var taskButtonHandler = function(event) {
    // get target element from event.target
    var targetEl = event.target

    // edit button was clicked
    if (targetEl.matches(".edit-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
    } else if (targetEl.matches(".delete-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

var editTask = function(taskId) {
    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;

    var taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute("data-task-id", taskId);
};

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

// function performed when the button is clicked
pageContentEl.addEventListener("click", taskButtonHandler);
