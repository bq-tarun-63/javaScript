let btn1= document.getElementById("btn1");
let body=document.body;
btn1.addEventListener("click",()=>{
    body.classList.toggle("black");
})

let  btn2 = document.getElementById("enter-btn");
let input=document.getElementById("userInput")
console.log(input);
dialouge
btn2.addEventListener("click",()=>{
    const text=input.value.trim();
    console.log(text);
    let li=document.createElement("li");
    li.textContent=text;
    let list=document.getElementById("ol");
    list.appendChild(li);
})


