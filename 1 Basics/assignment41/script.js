document.addEventListener("DOMContentLoaded", () => {
    displayList();
});

let editingTaskId = null;

// Search Task
let find = document.getElementById("find");
find.addEventListener("click", search_task);

function search_task() {
    let searchText = document.getElementById("searchText").value.trim();
    let storedTasks = JSON.parse(localStorage.getItem("taskList") || "[]");

    let filteredTasks = storedTasks.filter(task =>
        task.task.toLowerCase().includes(searchText.toLowerCase())
    );

    displayList(filteredTasks);
}

// Add Task Modal
let add = document.getElementById("add");
let formbox = document.getElementById("form-box");
let form = document.getElementById("form");

add.addEventListener("click", () => {
    formbox.style.display = "flex";
});

document.getElementById("close").addEventListener("click", () => {
    formbox.style.display = "none";
});

// Submit Form
form.addEventListener("submit", (event) => {
    event.preventDefault();
    let task = form.task.value;
    let date = form.date.value;
    let description = form.description.value;
    let tasks = JSON.parse(localStorage.getItem("taskList") || "[]");

    if (editingTaskId) {
        tasks = tasks.map(t => t.id === editingTaskId ? { ...t, task, date, description } : t);
        editingTaskId = null;
    } else {
        tasks.push({ id: Date.now(), task, date, description, completed: false });
    }

    localStorage.setItem("taskList", JSON.stringify(tasks));
    formbox.style.display = "none";
    displayList();
    form.reset();
});

// Display Tasks
function displayList(tasks = null) {
    let taskList = document.getElementById("list");
    taskList.innerHTML = "";
    let allTasks = JSON.parse(localStorage.getItem("taskList") || "[]");

    (tasks || allTasks).forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? "checked" : ""} onclick="toggleStrike(this, ${task.id})">
            <span>${task.task}</span>
            <span class="task-date">${task.date}</span>
            <button onclick="editTask(${task.id})">✏️</button>
            <button onclick="removeTask(${task.id})">🗑️</button>
        `;
        taskList.appendChild(li);
    });
}

function removeTask(id) {
    let tasks = JSON.parse(localStorage.getItem("taskList") || "[]").filter(task => task.id !== id);
    localStorage.setItem("taskList", JSON.stringify(tasks));
    displayList();
}

// Dark Mode Toggle
document.getElementById("darkModeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode") ? "enabled" : "disabled");
});
function editTask(id) {
    let tasks = JSON.parse(localStorage.getItem("taskList")) || [];
    let task = tasks.find(t => t.id === id);
    if (!task) return;

    // Prefill form with existing task data
    form.task.value = task.task;
    form.description.value = task.description;
    form.date.value = task.date;

    // Update form title
    formTitle.textContent = "Edit Task";

    // Store task ID to update later
    editingTaskId = id;

    // Show modal
    formbox.style.display = "flex";
}
