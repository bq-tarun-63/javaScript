
function asyncFunc(){
    return new Promise((resolve,re)=>{
        setTimeout(()=>{
            console.log("some Data1"); 
            re("success");
        },4000);
    });
}
console.log("fetching data1");

let p1=asyncFunc();
p1.then((r)=>{ v  
    console.log(r);
});

p1.catch((r)=>{
    console.log(r);
}); 




//lets
let promise2 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console("hiii its promise2")
        resolve("succcess");
    },2000);
});
promise2.then((response)=>{
    console.log(response);
}) 














// const promise1=  new Promise(( one ,two) => {
//     setTimeout(() => {
//      console.log("I am a promise");
//       two("success");
//       one("success++")
//       // reject("error")
//     }, 2000);
//   });

// promise1.then(()=>{
//     console.log("promise fulfilled");
// });
// promise1.catch(()=>{
//     console.log("rejected");
// })

// console.log("2");





//
//
//
//
//
//
//
//
//
// const myPromise =new Promise((resolve,reject)=>{
//     let success =true;
//     setTimeout(()=>{
//         if(0){
//             resolve("promise Resolved Successfully");

//         }
//         else{
//             reject("Promise Reject");
//         }

//     },2000);
// });

// myPromise
//     .then(result => console.log(result))
//     .catch(error => console.log(error));

//--------------------*************************************----------------//
