document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("task-input");
    let taskText = taskInput.value.trim();
    if (taskText === "") return;

    let taskList = document.getElementById("task-list");
    let li = createTaskElement(taskText);

    taskList.appendChild(li);
    saveTasks();

    taskInput.value = "";
}

function createTaskElement(taskText) {
    let li = document.createElement("li");
    
    let taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;

    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-button");
    editButton.onclick = function() { editTask(taskSpan); };

    let removeButton = document.createElement("button");
    removeButton.textContent = "X";
    removeButton.onclick = function() { 
        removeTask(li);
    };

    li.appendChild(taskSpan);
    li.appendChild(editButton);
    li.appendChild(removeButton);
    
    return li;
}

function removeTask(taskItem) {
    taskItem.remove();
    saveTasks();
}

function editTask(taskSpan) {
    let newText = prompt("Edit your task:", taskSpan.textContent);
    if (newText !== null && newText.trim() !== "") {
        taskSpan.textContent = newText.trim();
        saveTasks();
    }
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#task-list li span").forEach(task => {
        tasks.push(task.textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let taskList = document.getElementById("task-list");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(taskText => {
        let li = createTaskElement(taskText);
        taskList.appendChild(li);
    });
}
