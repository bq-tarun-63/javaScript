document.addEventListener("DOMContentLoaded", () => {
    displayList();
});
//localStorage.clear();

let editingTaskId = null;
let find = document.getElementById("find");
let formbox = document.getElementById("form-box");
let form = document.getElementById("form");
let formTitle = document.getElementById("formTitle");


find.addEventListener("click", find1);

function find1() {
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
        displayList(); 
        find.textContent = "Find";
        find.className = "search-btn";
        document.getElementById("searchText").value = "";
    }
}


document.getElementById("add").addEventListener("click", () => {
    formbox.style.display = "flex";
    formTitle.textContent = "Add New Task"; 
    form.reset();
    editingTaskId = null; 
});


document.getElementById("close").addEventListener("click", () => {
    formbox.style.display = "none";
});


form.addEventListener("submit", (event) => {
    event.preventDefault();

    let task = form.task.value.trim();
    let date = form.date.value;
    let description = form.description.value.trim();
   // if (!task || !date || !description) return; 
    console.log(task,date,description);
    let tasks = JSON.parse(localStorage.getItem("taskList") || "[]");

    if (editingTaskId) {
        
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


document.getElementById("sort").addEventListener("click", () => {
    let tasks = JSON.parse(localStorage.getItem("taskList") || "[]");
    tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    localStorage.setItem("taskList", JSON.stringify(tasks));
    displayList();
});


function toggleStrike(checkbox, id) {
    let tasks = JSON.parse(localStorage.getItem("taskList") || "[]");
    tasks.forEach(task => {
        if (task.id === id) task.completed = checkbox.checked;
    });
    localStorage.setItem("taskList", JSON.stringify(tasks));
    displayList();
}


function editTask(id) {
    let tasks = JSON.parse(localStorage.getItem("taskList") || []);
    let task = tasks.find(t => t.id === id);
    if (!task) return;

    // Ensure formTitle exists before updating text
    formTitle.textContent= "Edit Task";
    console.log(formTitle.textContent);
    // Prefill form with task details
    form.task.value = task.task;
    form.description.value = task.description;
    form.date.value = task.date;

    // Store task ID for editing
    editingTaskId = id;

    // Ensure formbox exists before making it visible
    if (formbox) formbox.style.display = "flex";
}


function removeTask(id) {
    let tasks = JSON.parse(localStorage.getItem("taskList") || "[]");
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem("taskList", JSON.stringify(tasks));
    displayList();
}


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
            <input type="checkbox" ${task.completed ? "checked" : ""} 
                onclick="toggleStrike(this, ${task.id})">
            <span class="task-text ${task.completed ? 'completed' : ''}">${task.task}</span>
            <span class="task-date">${task.date}</span>
            <button onclick="editTask(${task.id})">✏️</button>
            <button onclick="removeTask(${task.id})">🗑️</button>
        `;

        taskList.appendChild(li);
    });
}

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
