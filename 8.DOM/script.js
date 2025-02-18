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


let box= document.querySelectorAll(".box");
console.dir(box);
console.log(box);

let h1= document.getElementById("h1");
h1.textContent ="Dom Manipulation in action";


let list = document.querySelector("ul");

list.innerHTML+= "<li class='list-item'>Item 4 </li>";
h1.style.color ="green";
h1.style.fontSize="40px";


h1.style.backgroundColor="black"
let title =h1;
title.style.padding = "100px";
title.style.borderRadius = "5px";
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

// let button=document.getElementById("button");
// let ii = 0; // Declare ii globally



// // button.addEventListener("click", function () {
// //     if (ii == 0) {
// //         document.body.style.backgroundColor = "lightblue";
// //         ii++; // Increase ii
// //     } else {
// //         document.body.style.backgroundColor = "green";
// //         ii--; // Decrease ii
// //     }
// // });


// button.addEventListener("click",function(){
//     document.body.classList.toggle("pink-bg");
// });




