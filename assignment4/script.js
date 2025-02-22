// console.log("hello");
function var1(id){ 
    return  new Promise((resolve,reject)=>{
    let data=fetch("https://jsonplaceholder.typicode.com/posts/"+id);

  //console.log(data.json());
  //store.set(id,data);
  console.log(resolve(data));
   
    
})

}
let store = [];
for (let i = 0; i <=5; i++) {
    const element =  fetch("https://jsonplaceholder.typicode.com/posts/1"); ;
    store.push(element);
}
console.log(store);
Promise.all(store[0],store[1],store[2],store[3],store[4])
{
    console.log("d");
}

// let data=fetch("https://jsonplaceholder.typicode.com/posts/1");
// let arr=[1,2,3,4,5];

// console.log(data.json);