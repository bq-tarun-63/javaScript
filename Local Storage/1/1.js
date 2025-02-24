document.addEventListener("DOMContentLoaded", () => {
    let storedTasks = localStorage.getItem("taskList");
    let tasks = storedTasks ? JSON.parse(storedTasks) : [];
    displayList();

    // Dark Mode Persistence
    if (localStorage.getItem("dark-mode") === "enabled") {
        document.body.classList.add("dark");
    }
});

// Dark Mode Toggle
document.getElementById("dark-mode-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("dark-mode", document.body.classList.contains("dark") ? "enabled" : "disabled");
});

// Search Functionality
document.getElementById("find").addEventListener("click", search_task);

function search_task() {
    let searchText = document.getElementById("Search").value.trim().toLowerCase();
    let tasks = JSON.parse(localStorage.getItem("taskList")) || [];
    let filteredTasks = tasks.filter(task => task.task.toLowerCase().includes(searchText));
    displayList(filteredTasks);
}

// Toggle Form Visibility
document.getElementById("add").addEventListener("click", () => {
    document.getElementById("form-box").classList.toggle("one");
});

// Sorting Tasks by Date
document.getElementById("sort").addEventListener("click", () => {
    let tasks = JSON.parse(localStorage.getItem("taskList")) || [];
    tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    localStorage.setItem("taskList", JSON.stringify(tasks));
    displayList();
});

// Add New Task
document.getElementById("form").addEventListener("submit", (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    let newTask = {
        id: Date.now(),
        task: formData.get("task"),
        date: formData.get("date"),
        description: formData.get("description"),
    };

    let tasks = JSON.parse(localStorage.getItem("taskList")) || [];
    tasks.push(newTask);
    localStorage.setItem("taskList", JSON.stringify(tasks));
    document.getElementById("form-box").classList.toggle("one");
    displayList();
});

// Display Tasks
function displayList(taskArray = null) {
    let taskList = document.getElementById("list");
    taskList.innerHTML = "";
    let tasks = taskArray || JSON.parse(localStorage.getItem("taskList")) || [];

    tasks.forEach(task => {
        let li = document.createElement("li");
        li.setAttribute("id", task.id);
        li.setAttribute("draggable", true);
        li.innerHTML = `
            <input type="checkbox" class="checkbox">
            <span>${task.task} - ${task.date}</span>
            <button class='delete' onclick='removeTask(${task.id})'>X</button>
        `;
        
        // Drag & Drop Events
        li.addEventListener("dragstart", dragStart);
        li.addEventListener("dragover", dragOver);
        li.addEventListener("drop", drop);
        taskList.appendChild(li);
    });
}

// Remove Task
function removeTask(id) {
    let tasks = JSON.parse(localStorage.getItem("taskList")) || [];
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem("taskList", JSON.stringify(tasks));
    displayList();
}

// Drag and Drop
let draggedItem = null;

function dragStart(event) {
    draggedItem = event.target;
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    let taskList = document.getElementById("list");
    let children = Array.from(taskList.children);
    let dropTarget = event.target.closest("li");

    if (dropTarget && draggedItem !== dropTarget) {
        let draggedIndex = children.indexOf(draggedItem);
        let dropIndex = children.indexOf(dropTarget);
        children.splice(draggedIndex, 1);
        children.splice(dropIndex, 0, draggedItem);
        
        taskList.innerHTML = "";
        children.forEach(child => taskList.appendChild(child));
    }
}
