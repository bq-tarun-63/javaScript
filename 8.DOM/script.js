let div= document.createElement("div");
div.setAttribute("id","my1Div");
div.setAttribute("class","container");
document.body.appendChild(div);


// let idValue = div.getAttribute("id");
// console.log(idValue);

let p= document.createElement("p");
// p.textContent ="Hello, World";

 div.appendChild(p);

 div.append("Text inside div", document.createElement("span"));

div.removeChild(p);

div.classList.add("new-class");
div.classList.remove("new-class");

div.classList.toggle("dark-mode");
























//alert();
// console.log("Hello World");
// let abc=document.getElementById("heading");;//h1
// let div=document.getElementById("div");

// let newheading = document.querySelector("heading");
// let h1= document.getElementById("h1");

// let h1=document.getElementById("heading");

// let h2=document.createElement("F");

// h2.textContent="This is very bad";
// h1.append(h2);


// let box= document.querySelectorAll(".box");
// console.dir(box);
// console.log(box);

// let h1= document.getElementById("h1");
// h1.textContent ="Dom Manipulation in action";


// let list = document.querySelector("ul");

// list.innerHTML+= "<li class='list-item'>Item 4 </li>";
// h1.style.color ="green";
// h1.style.fontSize="40px";


// h1.style.backgroundColor="black"
// let title =h1;
// title.style.padding = "100px";
// title.style.borderRadius = "5px";
//title.classList.remove("padding");


///////////////////////-----Event Listener--------//////////////////////

//  var i=1;
// title.addEventListener("click" , function(){
//     if (i==1){
//     title.style.color = "red";
//     title.textContent ="You clicked me";
// i--;}
// else{
//     title.style.color = "green";
//     title.textContent ="Starting with Dom manipulation"; 
//     i++;
// }
// });

// title = document.getElementById("main-title");

// title.addEventListener("mouseenter", function () {
//     title.style.color = "blue";
// });

// title.addEventListener("mouseleave", function () {
//     title.style.color = "black";
// });
// let inputBox = document.getElementById("name-input");

// inputBox.addEventListener("input",function
//     (){
//         console.log("user typed: ",inputBox.value);
//     }
// )

// Declare ii globally



// // button.addEventListener("click", function () {
// //     if (ii == 0) {
// //         document.body.style.backgroundColor = "lightblue";
// //         ii++; // Increase ii
// //     } else {
// //         document.body.style.backgroundColor = "green";
// //         ii--; // Decrease ii
// //     }
// // });

// let button=document.getElementById("button");
// let ii = 0
// button.addEventListener("click",function(){
//     document.body.classList.toggle("pink-bg");
// });

// let one =document.getElementById("btn1");

    
//     // Creating event listeners for 10 different buttons with different events
//      one.addEventListener("click", () => alert("Button 1 Clicked"));
//     // document.getElementById("btn2").addEventListener("dblclick", () => alert("Button 2 Double Clicked"));
//     // document.getElementById("btn3").addEventListener("mousedown", () => alert("Button 3 Mouse Down"));
//     // document.getElementById("btn4").addEventListener("mouseup", () => alert("Button 4 Mouse Up"));
//     // document.getElementById("btn5").addEventListener("mouseenter", () => alert("Mouse Entered Button 5"));
//     // document.getElementById("btn6").addEventListener("mouseleave", () => alert("Mouse Left Button 6"));
//     // document.getElementById("btn7").addEventListener("contextmenu", (e) => {
//     //     e.preventDefault();
//     //     alert("Right Clicked Button 7");
//     // });
//     // document.getElementById("btn8").addEventListener("focus", () => alert("Button 8 Focused"));
//     // document.getElementById("btn9").addEventListener("blur", () => alert("Button 9 Lost Focus"));
//     // document.getElementById("btn10").addEventListener("keydown", () => alert("Key Pressed on Button 10"));




