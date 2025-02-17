// The startsWith() method returns true if a string begins with a specified value, otherwise false:



let text = "Hello world  welcome to the universe.";

console.log(text.includes("word")); 

//The startsWith() method returns true if a string begins with a specified value, otherwise false:
//The endsWith() method returns true if a string ends with a specified value, otherwise false:


let text1 ="Hello world , welcome to Tarun,s World";
console.log(text1.startsWith("Hello"), text1.endsWith("World"));

/* The entries() method returns an Array Iterator object with key/value pairs:

[0, "Banana"]
[1, "Orange"]
[2, "Apple"]
[3, "Mango"]

The entries() method does not change the original array. */


const fruits =["Banana","Orange","Apple","Mango"];
const f= fruits.entries();
console.log(f);
for (let x of f){
    console.log(x);
}


const numbers = [4, 9, 16, 25, 29];
let first = numbers.find(myFunction);

function myFunction(value, index, array) {




    if(value >20 )console.log(value);

  return 180000;
}

console.log(first);