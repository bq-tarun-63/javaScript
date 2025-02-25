document.addEventListener("DOMContentLoaded", () => {
    displayList();
});

let find = document.getElementById("find");
let searchText = document.getElementById("searchText");
let add = document.getElementById("add");
let formbox = document.getElementById("form-box");
let close1 = document.getElementById("close");
let form = document.getElementById("form");
let sort = document.getElementById("sort");
let clearAll = document.getElementById("clearAll");

find.addEventListener("click", search_task);
add.addEventListener("click", () => toggle(formbox, "one"));
close1.addEventListener("click", () => toggle(formbox, "one"));
sort.addEventListener("click", sortTasks);
clearAll.addEventListener("click", clearAllTasks);

function toggle(tag, class1) {
    tag.classList.toggle(class1);
}

function search_task() {
    let search_btn_class = find.className;

    if (search_btn_class === "search-btn") {
        let search_text = searchText.value.trim().toLowerCase();
        let tasks = getTasks();

        let searched_task_arr = tasks.filter(task =>
            task.task.toLowerCase().includes(search_text)
        );

        displayList(searched_task_arr);
        find.textContent = "Cancel";
        find.className = "cancel-btn";
    } else {
        displayList();
        find.textContent = "Find";
        find.className = "search-btn";
        searchText.value = "";
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let formData = new FormData(form);
    let task = formData.get("task");
    let date = formData.get("date");
    let description = formData.get("description");

    let dataObj = {
        id: Date.now(),
        task: task,
        date: date,
        description: description,
        completed: false
    };

    let taskList = getTasks();
    taskList.push(dataObj);

    localStorage.setItem("taskList", JSON.stringify(taskList));
    toggle(formbox, "one");
    displayList();
});

function displayList(filteredTasks = null) {
    let taskList = document.getElementById("list");
    taskList.innerHTML = "";
    let tasks = filteredTasks || getTasks();

    tasks.forEach((task) => {
        let li = document.createElement("li");
        li.setAttribute("id", task.id);
        
        let checked = task.completed ? "checked" : "";
        let strikeClass = task.completed ? "strikethrough" : "";

        li.innerHTML = `
            <input type="checkbox" ${checked} onchange="toggleStrike(this, ${task.id})">
            <span class="task-text ${strikeClass}"> ${task.task} (${task.date})</span>
            <button class='delete' onclick='removeTask(${task.id})'>X</button>
        `;

        taskList.appendChild(li);
    });
}

function toggleStrike(checkbox, id) {
    let tasks = getTasks();
    let task = tasks.find(t => t.id === id);
    task.completed = checkbox.checked;
    localStorage.setItem("taskList", JSON.stringify(tasks));
    displayList();
}

function removeTask(id) {
    let tasks = getTasks().filter(task => task.id !== id);
    localStorage.setItem("taskList", JSON.stringify(tasks));
    displayList();
}

function sortTasks() {
    let tasks = getTasks();
    tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    localStorage.setItem("taskList", JSON.stringify(tasks));
    displayList();
}

function clearAllTasks() {
    localStorage.removeItem("taskList");
    displayList();
}

function getTasks() {
    return JSON.parse(localStorage.getItem("taskList")) || [];
}
