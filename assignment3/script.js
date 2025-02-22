let add=document.getElementById("add");
let minus=document.getElementById("minus");
let reset=document.getElementById("reset");
let curr=document.getElementById("curr")
let counter=0;
add.addEventListener("click",()=>{
    counter++;
    curr.innerText=counter;

})
console.log("t")
minus.addEventListener("click",()=>{
    
    if(counter!=0){counter--;

    curr.innerHTML=counter;}

})
reset.addEventListener("click",()=>{
    counter=0;
    curr.innerHTML=counter;

})