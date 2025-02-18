//array destructuring

const numbers=[1,2,3];
const [a,b,c]=numbers;
console.log(a,b,c);


//object destructure

const number={name:"tarun",surname:"dubey",age:"30"};

const{name,surname,age}=number;

//destructure with specifying name

 const{name:n1,surname:n2}=number;

const user ={
    id:1,
    profile:{
        username:"bob123",
        email:"dubeytarun1001@gmail.com"
    }
};

const{id, profile:{username,email}}=user;

console.log(username);