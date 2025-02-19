// // // const person = {
// // //     firstName:"John",
// // //     lastName: "Doe",
// // //     display: function () {
// // //       console.log( this.firstName + " " + this.lastName);
// // //     }
// // //   }
// // //   //person.display();

 
// // //   setTimeout(person.display, 3000);




// // //-------------------//

// // // const person = {
// // //   name: "Alice",
// // //   greet: function() {
// // //     console.log("Hello, my name is " + this.name);
// // //   }
// // // };

// // // const sayHello = person.greet;
// // // sayHello(); // ❌ Undefined or error (this is lost)

// // // const boundGreet = person.greet.bind(person);
// // // boundGreet(); // ✅ Hello, my name is Alice


// // //
// // const person = {
// //   name: "Alice",
// //   greet(abc) {
// //     return console.log("Hello, my name is " + abc.name);
// //   }
// // };
// // person.greet(person);
// // setTimeout(()=>(console.log("1")), 3000); // ❌ Undefined or error (this is lost)
// // //setTimeout(person.greet.bind(person), 3000); // ✅ Hello, my name is Alice

// const user = {
//   name: "Emma",
//   greet() {
//     console.log("Hello, " + this.name);
//   }
// };

// const otherUser = { name: "Frank" };
// user.greet();
// user.greet.call(otherUser); // ✅ Hello, Frank
// const obj = { 0: "apple", 1: "banana", length: 2 };

// // Borrow `push` from arrays
// Array.prototype.push(obj, "cherry");

// console.log(obj);
// // ✅ { 0: "apple", 1: "banana", 2: "cherry", length: 3 }
const numbers = [5, 10, 15, 20];

const maxNumber = Math.max(null, ...numbers);

console.log(maxNumber); 
// ✅ 20
