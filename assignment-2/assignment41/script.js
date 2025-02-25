document.addEventListener("DOMContentLoaded", () => {
    displayList();
});

let find = document.getElementById("find");
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

let add = document.getElementById("add");
let formbox = document.getElementById("form-box");

add.addEventListener("click", () => {
    formbox.style.display = "flex";
});

let close1 = document.getElementById("close");
close1.addEventListener("click", () => {
    formbox.style.display = "none";
});

let form = document.getElementById("form");
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
// form.addEventListener("submit", (event) => {
//     event.preventDefault();

//     let formdata = new FormData(form);
//     let task = formdata.get("task");
//     let date = formdata.get("date");
//     let description = formdata.get("description");

//     let dataObj = {
//         id: Date.now(),
//         task: task,
//         date: date,
//         description: description,
//         completed: false,
//     };

//     let List = localStorage.getItem("taskList");
//     let taskList = List ? JSON.parse(List) : [];
//     taskList.push(dataObj);

//     localStorage.setItem("taskList", JSON.stringify(taskList));
//     formbox.style.display = "none";
//     displayList();
// });

let sort = document.getElementById("sort");
sort.addEventListener("click", () => {
    let tasks = localStorage.getItem("taskList");
    let taskList = tasks ? JSON.parse(tasks) : [];

    taskList.sort((a, b) => new Date(a.date) - new Date(b.date));
    localStorage.setItem("taskList", JSON.stringify(taskList));
    displayList();
});

// DRAG & DROP FUNCTIONALITY
let draggedItem = null;
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
    let updatedTasks = items.map((item) => {
        let storedTasks = JSON.parse(localStorage.getItem("taskList")) || [];
        return storedTasks.find((task) => task.id == item.id);
    });

    localStorage.setItem("taskList", JSON.stringify(updatedTasks));
}

function removeTask(id) {
    let storedTasks = localStorage.getItem("taskList");
    let tasks = storedTasks ? JSON.parse(storedTasks) : [];

    tasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem("taskList", JSON.stringify(tasks));
    displayList();
}

// DARK MODE FUNCTIONALITY
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