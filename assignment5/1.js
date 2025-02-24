// //problem
// var a=0;
// function incre(){a++;}
// //now a is vulnerable and exposed to other scopes also

// // we can also do something like

// function incre(){
//     var a=0;
//     return a++;
 
// }
// //but everytime its default value become zero
// // can also do like
// function incre(a){
//     return a++;
// }

//but we need to pass previous value of the counter

function counter(){
    counter=0;
    return function increment(){
        return counter++;
    }
}

let incrementer=counter();

incrementer()
incrementer()
let curr=incrementer();
console.log(incrementer.counter);
console.log(curr);
