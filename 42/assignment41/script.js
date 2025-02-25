document.addEventListener("DOMContentLoaded", () => {
    displayList();
});

let find = document.getElementById("find");
find.addEventListener("click", search_task);

function search_task() {
    let searchText = document.getElementById("searchText").value.trim();
    let storedTasks = localStorage.getItem("taskList");
    let tasks = storedTasks ? JSON.parse(storedTasks) : [];

    let searchedTasks = tasks.filter(task => task.task.toLowerCase().includes(searchText.toLowerCase()));

    displayList(searchedTasks);
}

let add = document.getElementById("add");
let formBox = document.getElementById("form-box");
let form = document.getElementById("form");
let formTitle = document.getElementById("form-title");
let editingTaskId = null;

add.addEventListener("click", () => {
    form.reset();
    formTitle.textContent = "Add New Task";
    editingTaskId = null;
    formBox.style.display = "flex";
});

document.getElementById("close").addEventListener("click", () => {
    formBox.style.display = "none";
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let formData = new FormData(form);
    let task = formData.get("task");
    let date = formData.get("date");
    let description = formData.get("description");

    let tasks = JSON.parse(localStorage.getItem("taskList") || "[]");

    if (editingTaskId) {
        tasks = tasks.map(t => t.id === editingTaskId ? { ...t, task, date, description } : t);
    } else {
        tasks.push({ id: Date.now(), task, date, description, completed: false });
    }

    localStorage.setItem("taskList", JSON.stringify(tasks));
    formBox.style.display = "none";
    displayList();
});

function displayList(tasks = null) {
    let taskList = document.getElementById("list");
    taskList.innerHTML = "";
    let storedTasks = JSON.parse(localStorage.getItem("taskList") || "[]");
    let displayTasks = tasks || storedTasks;

    displayTasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? "checked" : ""}>
            <span>${task.task}</span>
            <span class="task-date">${task.date}</span>
            <button onclick="editTask(${task.id})">✏️</button>
            <button onclick="removeTask(${task.id})">🗑️</button>
        `;
        taskList.appendChild(li);
    });
}

function editTask(id) {
    let tasks = JSON.parse(localStorage.getItem("taskList"));
    let task = tasks.find(t => t.id === id);

    form.task.value = task.task;
    form.description.value = task.description;
    form.date.value = task.date;
    formTitle.textContent = "Edit Task";
    editingTaskId = id;
    formBox.style.display = "flex";
}

function removeTask(id) {
    let tasks = JSON.parse(localStorage.getItem("taskList")).filter(task => task.id !== id);
    localStorage.setItem("taskList", JSON.stringify(tasks));
    displayList();
}
