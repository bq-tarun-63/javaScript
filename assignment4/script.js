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

function toggle(tag, class1) {
    tag.classList.toggle(class1);
}

add.addEventListener("click", () => {
    formbox.style.display = "flex"; // Show form as a modal
});

let close1 = document.getElementById("close");
close1.addEventListener("click", () => {
    formbox.style.display = "none"; // Hide form
});

let form = document.getElementById("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();

    let formdata = new FormData(form);
    let task = formdata.get("task");
    let date = formdata.get("date");
    let description = formdata.get("description");

    let dataObj = {
        id: Date.now(),
        task: task,
        date: date,
        description: description,
        completed: false, // Track completion
    };

    let List = localStorage.getItem("taskList");
    let taskList = List ? JSON.parse(List) : [];
    taskList.push(dataObj);

    localStorage.setItem("taskList", JSON.stringify(taskList));
    formbox.style.display = "none"; // Hide modal after submission
    displayList();
});

let sort = document.getElementById("sort");
sort.addEventListener("click", () => {
    let tasks = localStorage.getItem("taskList");
    let taskList = tasks ? JSON.parse(tasks) : [];

    taskList.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date
    localStorage.setItem("taskList", JSON.stringify(taskList));
    displayList();
});

function displayList(tasks = null) {
    let taskList = document.getElementById("list");
    taskList.innerHTML = "";
    let storedTasks = localStorage.getItem("taskList");
    let allTasks = storedTasks ? JSON.parse(storedTasks) : [];
    
    let displayTasks = tasks || allTasks;

    displayTasks.forEach((task) => {
        let li = document.createElement("li");
        li.setAttribute("id", task.id);

        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} onclick="toggleStrike(this,${task.id})">
            <span class="${task.completed ? "strikethrough" : ""}">${task.task}</span>
            <span class="task-date">${task.date}</span>
            <button class='delete' onclick='removeTask(${task.id})'>&#128465;</button>
        `;

        taskList.appendChild(li);
    });
}

function toggleStrike(checkbox, id) {
    let storedTasks = localStorage.getItem("taskList");
    let tasks = storedTasks ? JSON.parse(storedTasks) : [];

    tasks.forEach((task) => {
        if (task.id === id) {
            task.completed = checkbox.checked;
        }
    });

    localStorage.setItem("taskList", JSON.stringify(tasks));

    let text = checkbox.nextElementSibling;
    if (checkbox.checked) {
        text.classList.add("strikethrough");
    } else {
        text.classList.remove("strikethrough");
    }
}


function removeTask(id) {
    let storedTasks = localStorage.getItem("taskList");
    let tasks = storedTasks ? JSON.parse(storedTasks) : [];

    tasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem("taskList", JSON.stringify(tasks));
    displayList();
}
