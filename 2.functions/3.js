const x= function (a,b){return a*b};
const y= (a,b)=>(a*b);
console.log(y(2,3));

//self invoking
var a=2;
var b= 3;

(function (){
   console.log(a * b) ;
})();

(()=>console.log(a*b))(); //arrow with self invoking


//type of function will return function for functions
// nut best it can be described as objects
//JavaScript functions have both properties abd methods
//The arguments.length
//property return the number of arguments recieved when the function was invoked

function myfunc(a,b){
 return console.log(arguments.length);
}
myfunc(2,3,4,5,6,6);






