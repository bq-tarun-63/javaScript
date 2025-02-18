
// function funct() {
//     console.log("d");
// }
// for(let i=0;i<5;i++){
// setTimeout(funct,3000*i); // we are increasing the time of every settimeout function

// }

function print(){
    console.log("hello");
    
}
let ping=setInterval(print,2000);
function stop(){
    clearInterval(ping );
    console.log("-------------END-----------");

}
setTimeout(stop,10000);
clearInterval(ping);
