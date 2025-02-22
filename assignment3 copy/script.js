let add=document.getElementById("add");
let minus=document.getElementById("minus");
let reset=document.getElementById("reset");
let curr=document.getElementById("curr")
let txt1=document.getElementById("txt1");
let h=document.getElementById("h");
let counter=0;
add.addEventListener("click",()=>{
    counter++;
    console.log(counter);
    h.innerText=counter;
    let a=counter.trim();
    txt1.setAttribute('placeholder',counter);
   
})
console.log("t")
//let setvalue=document.getElementById("setvalue");
let enter=document.getElementById("enter");

enter.addEventListener("click",()=>{
 
const text=txt1.value.trim();
 counter=text;
console.log(text);
 txt1.setAttribute("placeholder",text);
   /// txt1.setAttribute(va);
})
// minus.addEventListener("click",()=>{
    
//     if(counter!=0){
//         counter--;

//         txt1.setAttribute('placeholder','counter')}

// })
// reset.addEventListener("click",()=>{
//     counter=0;
//     txt1.setAttribute('placeholder','counter')

// })