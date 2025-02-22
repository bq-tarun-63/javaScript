document.addEventListener("DOMContentLoaded", () => {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    displayList(tasks);
});

// Handle form submission
document.getElementById("taskForm").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form refresh
    let input = document.getElementById("input");
    let txt = input.value.trim();
    
    if (txt === "") return;

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: txt, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayList(tasks);
    input.value = "";
});

// Search tasks
document.getElementById("find").addEventListener("click", () => {
    let searchText = document.getElementById("search").value.toLowerCase();
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let filteredTasks = tasks.filter(task => task.text.toLowerCase().includes(searchText));
    displayList(filteredTasks);
});

function displayList(tasks) {
    let taskList = document.getElementById("list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}>
            <span class="${task.completed ? "completed" : ""}">${task.text}</span>
            <button class='delete' onclick='removeTask(${index})'>X</button>
        `;

        // Toggle completion
        li.querySelector(".checkbox").addEventListener("change", function () {
            task.completed = this.checked;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            displayList(tasks);
        });

        taskList.appendChild(li);
    });
}

function removeTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayList(tasks);
}
