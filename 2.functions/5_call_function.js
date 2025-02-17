const person = {

    firstName: "td",
    lastName: "dt",

    fullName: function(abc){
        return console.log( abc.firstName + " " + abc.lastName);
        return console.log(this.firstName ," ", this.lastName);

    }
}

const person1 = {
    firstName : "Mary",
    lastName : "Doe"
}
const person2 ={
    firstName: "Tarun",
    lastName : "Dubey"
}
person.fullName(person1);
//person.fullName.call(person1);