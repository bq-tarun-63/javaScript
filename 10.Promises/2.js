//const p1 =new Promise(resolve=> setTimeout(()=> resolve("F1")));
const p1= new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve('Fastest1!');
    }, 1000);
})
const p2= new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve('Fastest2!');
    }, 2000);
})
const p3= new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve('Fastes3!');
    }, 3000);
})

const p4= new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve('Fastest4!');
    }, 4000);
})

const p5= new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve('Fastest5!');
    }, 5000);
})




/////////////----------Promise.all()--------------////////////////

// Promise.all([p1,p2,p3,p4,p5])
// .then((td)=>{
//     console.log(td);
// })


//////-----------------Promise.allSettled()

Promise.allSettled([promise1,promise2,promise3])
.then((a)=>console.log(console));