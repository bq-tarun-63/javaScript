document.addEventListener("DOMContentLoaded", () => {
    displayList();
});

// Global Variables
let editingTaskId = null;
let find = document.getElementById("find");
let formbox = document.getElementById("form-box");
let form = document.getElementById("form");
let formTitle = document.getElementById("formTitle"); // Ensure this exists in your HTML

// 🔍 Search Task Function
find.addEventListener("click", search_task);

function search_task() {
    let search_btn_class = find.className;
    let searchText = document.getElementById("searchText").value.trim();

    if (search_btn_class === "search-btn") {
        let storedTasks = localStorage.getItem("taskList");
        let tasks = storedTasks ? JSON.parse(storedTasks) : [];

        let searched_task_arr = tasks.filter((task) =>
            task.task.trim().toLowerCase().includes(searchText.toLowerCase())
        );

        displayList(searched_task_arr);
        find.textContent = "Cancel";
        find.className = "cancel-btn";
    } else {
        displayList(); // Reset list
        find.textContent = "Find";
        find.className = "search-btn";
        document.getElementById("searchText").value = "";
    }
}

// ➕ Add Button Click - Show Form
document.getElementById("add").addEventListener("click", () => {
    formbox.style.display = "flex";
    formTitle.textContent = "Add New Task"; // Reset form title
    form.reset();
    editingTaskId = null; // Reset editing mode
});

// ❌ Close Button - Hide Form
document.getElementById("close").addEventListener("click", () => {
    formbox.style.display = "none";
});

// 📝 Form Submission - Add or Edit Task
form.addEventListener("submit", (event) => {
    event.preventDefault();

    let task = form.task.value.trim();
    let date = form.date.value;
    let description = form.description.value.trim();
    if (!task || !date || !description) return; // Prevent empty fields

    let tasks = JSON.parse(localStorage.getItem("taskList") || "[]");

    if (editingTaskId) {
        // Update existing task
        tasks = tasks.map(t => t.id === editingTaskId ? { ...t, task, date, description } : t);
        editingTaskId = null;
    } else {
        // Add new task
        tasks.push({ id: Date.now(), task, date, description, completed: false });
    }

    localStorage.setItem("taskList", JSON.stringify(tasks));
    formbox.style.display = "none";
    displayList();
    form.reset();
});

// 📅 Sort Tasks by Date
document.getElementById("sort").addEventListener("click", () => {
    let tasks = JSON.parse(localStorage.getItem("taskList") || "[]");
    tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    localStorage.setItem("taskList", JSON.stringify(tasks));
    displayList();
});

// ✅ Toggle Task Completion
function toggleStrike(checkbox, id) {
    let tasks = JSON.parse(localStorage.getItem("taskList") || "[]");
    tasks.forEach(task => {
        if (task.id === id) task.completed = checkbox.checked;
    });
    localStorage.setItem("taskList", JSON.stringify(tasks));
    displayList();
}

// 📝 Edit Task Function (Fully Fixed)
function editTask(id) {
    let tasks = JSON.parse(localStorage.getItem("taskList") || []);
    let task = tasks.find(t => t.id === id);
    if (!task) return;

    // Ensure formTitle exists before updating text
    if (formTitle) formTitle.textContent = "Edit Task";

    // Prefill form with task details
    form.task.value = task.task;
    form.description.value = task.description;
    form.date.value = task.date;

    // Store task ID for editing
    editingTaskId = id;

    // Ensure formbox exists before making it visible
    if (formbox) formbox.style.display = "flex";
}

// 🗑️ Delete Task Function
function removeTask(id) {
    let tasks = JSON.parse(localStorage.getItem("taskList") || "[]");
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem("taskList", JSON.stringify(tasks));
    displayList();
}

// 🔄 Display Task List (Supports Drag & Drop)
function displayList(tasks = null) {
    let taskList = document.getElementById("list");
    taskList.innerHTML = "";
    let storedTasks = JSON.parse(localStorage.getItem("taskList") || "[]");

    let displayTasks = tasks || storedTasks;

    displayTasks.forEach(task => {
        let li = document.createElement("li");
        li.setAttribute("id", task.id);
        li.setAttribute("draggable", "true");
        li.addEventListener("dragstart", dragStart);
        li.addEventListener("dragover", dragOver);
        li.addEventListener("drop", drop);

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

// 🖱️ Drag & Drop Functionality
let draggedItem = null;

function dragStart(event) {
    draggedItem = event.target;
    event.dataTransfer.setData("text/plain", draggedItem.id);
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    let targetItem = event.target.closest("li");

    if (targetItem && targetItem !== draggedItem) {
        let list = document.getElementById("list");
        let items = [...list.children];

        let draggedIndex = items.indexOf(draggedItem);
        let targetIndex = items.indexOf(targetItem);

        if (draggedIndex > targetIndex) {
            list.insertBefore(draggedItem, targetItem);
        } else {
            list.insertBefore(draggedItem, targetItem.nextSibling);
        }

        updateLocalStorageOrder();
    }
}

function updateLocalStorageOrder() {
    let items = [...document.getElementById("list").children];
    let updatedTasks = items.map(item => {
        let storedTasks = JSON.parse(localStorage.getItem("taskList") || "[]");
        return storedTasks.find(task => task.id == item.id);
    });

    localStorage.setItem("taskList", JSON.stringify(updatedTasks));
}

// 🌙 Dark Mode Toggle
let darkModeToggle = document.getElementById("darkModeToggle");

if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    darkModeToggle.textContent = "Light Mode";
}

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
        darkModeToggle.textContent = "Light Mode";
    } else {
        localStorage.setItem("darkMode", "disabled");
        darkModeToggle.textContent = "Dark Mode";
    }
});
