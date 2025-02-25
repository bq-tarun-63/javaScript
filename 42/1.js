document.addEventListener("DOMContentLoaded", () => {
    displayList();
});

let find = document.getElementById("find");
find.addEventListener("click", search_task);

function search_task() {
    let searchText = document.getElementById("searchText").value.trim();
    let storedTasks = localStorage.getItem("taskList");
    let tasks = storedTasks ? JSON.parse(storedTasks) : [];

    let searchedTasks = tasks.filter(task =>
        task.task.trim().toLowerCase().includes(searchText.toLowerCase())
    );

    displayList(searchedTasks);
    find.textContent = "Cancel";
    find.className = "cancel-btn";
}

let add = document.getElementById("add");
let formbox = document.getElementById("form-box");

add.addEventListener("click", () => {
    formbox.style.display = "flex";
});

document.getElementById("close").addEventListener("click", () => {
    formbox.style.display = "none";
});

let form = document.getElementById("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();

    let formData = new FormData(form);
    let task = formData.get("task");
    let description = formData.get("description");
    let date = formData.get("date");

    let dataObj = {
        id: Date.now(),
        task: task,
        description: description,
        date: date,
        completed: false,
    };

    let tasks = JSON.parse(localStorage.getItem("taskList") || "[]");
    tasks.push(dataObj);
    localStorage.setItem("taskList", JSON.stringify(tasks));

    formbox.style.display = "none";
    displayList();
});

// Sorting Tasks
document.getElementById("sort").addEventListener("click", () => {
    let tasks = JSON.parse(localStorage.getItem("taskList") || "[]");
    tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    localStorage.setItem("taskList", JSON.stringify(tasks));
    displayList();
});

// Display List Function
function displayList(tasks = null) {
    let taskList = document.getElementById("list");
    taskList.innerHTML = "";
    let storedTasks = JSON.parse(localStorage.getItem("taskList") || "[]");
    let displayTasks = tasks || storedTasks;

    displayTasks.forEach((task) => {
        let li = document.createElement("li");
        li.setAttribute("id", task.id);
        li.draggable = true;

        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} onclick="toggleStrike(this,${task.id})">
            <span class="${task.completed ? "strikethrough" : ""}">${task.task}</span>
            <span class="task-date">${task.date}</span>
            <button class="edit" onclick="editTask(${task.id})">&#9998;</button>
            <button class="delete" onclick="removeTask(${task.id})">&#128465;</button>
        `;

        li.addEventListener("dragstart", dragStart);
        li.addEventListener("dragover", dragOver);
        li.addEventListener("drop", drop);

        taskList.appendChild(li);
    });
}

// Toggle Task Completion
function toggleStrike(checkbox, id) {
    let tasks = JSON.parse(localStorage.getItem("taskList") || "[]");

    tasks.forEach(task => {
        if (task.id === id) {
            task.completed = checkbox.checked;
        }
    });

    localStorage.setItem("taskList", JSON.stringify(tasks));
    displayList();
}

// Remove Task
function removeTask(id) {
    let tasks = JSON.parse(localStorage.getItem("taskList") || "[]");
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem("taskList", JSON.stringify(tasks));
    displayList();
}

// Edit Task
let editBox = document.getElementById("edit-box");
let editForm = document.getElementById("edit-form");
let currentTaskId = null;

function editTask(id) {
    let tasks = JSON.parse(localStorage.getItem("taskList") || "[]");
    let task = tasks.find(t => t.id === id);

    document.getElementById("edit-task").value = task.task;
    document.getElementById("edit-description").value = task.description;
    document.getElementById("edit-date").value = task.date;

    currentTaskId = id;
    editBox.style.display = "flex";
}

editForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let tasks = JSON.parse(localStorage.getItem("taskList") || "[]");
    tasks.forEach(task => {
        if (task.id === currentTaskId) {
            task.task = document.getElementById("edit-task").value;
            task.description = document.getElementById("edit-description").value;
            task.date = document.getElementById("edit-date").value;
        }
    });

    localStorage.setItem("taskList", JSON.stringify(tasks));
    editBox.style.display = "none";
    displayList();
});

document.getElementById("close-edit").addEventListener("click", () => {
    editBox.style.display = "none";
});
