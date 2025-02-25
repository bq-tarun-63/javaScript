document.addEventListener("DOMContentLoaded", () => {
  let storedTasks = localStorage.getItem("taskList");
  let tasks = storedTasks ? JSON.parse(storedTasks) : [];
  displayList();
  //localStorage.clear();
});
let find = document.getElementById("find");

find.addEventListener("click", search_task);

function search_task() {
  let search_btn_class = find.className;

  if (search_btn_class === "search-btn") {
    let search_text = searchText.value.trim();
    let storedTasks = localStorage.getItem("taskList");
    let tasks = storedTasks ? JSON.parse(storedTasks) : [];

    let searched_task_arr = tasks.filter((task) =>
      task.task.trim().toLowerCase().includes(search_text.toLowerCase())
    );

    displayList(searched_task_arr);
    find.textContent = "Cancel";
    find.className = "cancel-btn";
  } else {
    displayList(); // Reset to show all tasks
    find.textContent = "Find";
    find.className = "search-btn";
    searchText.placeholder = "Search Task...";
    searchText.value = "";
  }
}

let add = document.getElementById("add");
let formbox = document.getElementById("form-box");

function toggle(tag, class1) {
  tag.classList.toggle(class1);
}

add.addEventListener("click", () => {
  toggle(formbox, "one");
});
let sort = document.getElementById("sort");
  sort.addEventListener("click", () => {
    let tasks = localStorage.getItem("taskList");
    let taskList = tasks ? JSON.parse(tasks) : [];
    console.log("tasklist after", taskList);
  
    taskList.sort((a, b) => new Date(a.date) - new Date(b.date));
  
    console.log("tasklist after", taskList);
    taskList = JSON.stringify(taskList);
  
    localStorage.setItem("taskList", taskList);
    displayList();
  });
let close1 = document.getElementById("close");

close1.addEventListener("click", () => {
  toggle(formbox, "one");
});
///submit---------------------------------
let form = document.getElementById("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  let formdata;
  formdata = new FormData(form);

  console.log("ho gya");

  let task = formdata.get("task");
  let date = formdata.get("date");
  let description = formdata.get("description");

  console.log(description);

  let dataObj = {
    id: Date.now(),
    task: task,
    date: date,
    description: description,
  };

  let List = localStorage.getItem("taskList");
  let taskList = List ? JSON.parse(List) : [];
  taskList.push(dataObj);

  localStorage.setItem("taskList", JSON.stringify(taskList));
  //  List = localStorage.getItem("taskList");
  //  taskList = List ? JSON.parse(List) : [];
  //  console.log(taskList);
  toggle(formbox, "one");
  displayList();
});

function displayList() {
  let taskList = document.getElementById("list");
  taskList.innerHTML = "";
  let t = localStorage.getItem("taskList");
  let tasks = t ? JSON.parse(t) : [];

  //console.log("Sd");
  tasks.forEach((task) => {
    let li = document.createElement("li");
    //console.log(task);
    li.setAttribute("id", task.id);
    li.innerHTML = `<input type="checkbox" onchange="toggleStrike(this)" class="checkbox">  
                      <span> ${task.task} </span>
                      <button class='delete' onclick='removeTask(this)'>X</button>`;

    taskList.appendChild(li);
  });
}
function toggleStrike(checkbox){
  let text=checkbox.nextElementSibling;
  if(checkbox.checked){
    text.classList.add("strikethrough");
  }
  else{
    text.classList.remove("strikethrough");
  }
}

function removeTask(button) {
  let taskItem = button.parentElement;
  let taskText = Number(taskItem.getAttribute("id"));
  // console.log(taskText+"Gsd");
  let storedTasks = localStorage.getItem("taskList");
  let tasks = storedTasks ? JSON.parse(storedTasks) : [];
  //console.log("before",tasks);
  tasks = tasks.filter((task) => task.id !== taskText);
  localStorage.setItem("taskList", JSON.stringify(tasks));
  //console.log("after",tasks);
  displayList();
}
