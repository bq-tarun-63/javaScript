document.addEventListener("DOMContentLoaded", () => {
    let storedTasks = localStorage.getItem("tasks");
    
    // Check if tasks exist and parse safely
    let tasks = storedTasks ? JSON.parse(storedTasks) : [];
  
    tasks.sort(); // Ensure tasks are sorted
    displayList(tasks);
  });
  //localStorage.removeItem("tasks");

  let btn1 = document.getElementById("btn1");
  
  btn1.addEventListener("click", () => {
    let input = document.getElementById("input");
    let txt = input.value.trim();
  
    if (txt === "") return; // Prevent empty input
  console.log(txt);
    let storedTasks = localStorage.getItem("tasks");
    let tasks = storedTasks ? JSON.parse(storedTasks) : [];
  
    tasks.push(txt);
    tasks.sort(); // Keep sorted order
  
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Store properly
  
    displayList(tasks);
    input.value = "";
  });
  let find=document.getElementById("find");
  find.addEventListener("click",()=>{
    
  })
  function displayList(tasks) {
    let taskList = document.getElementById("list");
    taskList.innerHTML = ""; // Clear list
  console.log("Sd");
    tasks.forEach((task) => {
      let li = document.createElement("li");
      li.innerHTML = `<input type="checkbox" class="checkbox"> dialou${task} <button class='delete' onclick='removeTask(this)'>X</button>`;
      taskList.appendChild(li);
    });
  }
  
  function removeTask(button) {
    let taskItem = button.parentElement;
    let taskText = taskItem.textContent.replace("X", "").trim();
  
    let storedTasks = localStorage.getItem("tasks");
    let tasks = storedTasks ? JSON.parse(storedTasks) : [];
  
    tasks = tasks.filter((task) => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Store properly
  
    displayList(tasks);
  }
  