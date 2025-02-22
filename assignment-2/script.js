var store = new Map();
//store.set(1,"3");

// console.log("hello");
// function var1(id){ 
//     return  new Promise((resolve,reject)=>{
//     let data=fetch("https://jsonplaceholder.typicode.com/posts/"+id);

//   //console.log(data.json());
//   //store.set(id,data);
//   console.log(resolve(data));
   
    
// })

// }
// let data=fetch("https://jsonplaceholder.typicode.com/posts/1");
let arr=[1,2,3,4,5];
// console.log(data.json);
store.set("fd",2);
async function call(id){
  
 let response= ( await fetch("https://jsonplaceholder.typicode.com/posts/"+id));
 let data=    await response.json();
  store.set("id",JSON.stringify(data));
  console.log(id,data);
//  console.log(response);
}
call(1);
arr.forEach(id => {
    call(id);
   });
console.log(store);
store.forEach(function(value,key){
    console.log("d");
    console.log( value ,key);
   });



