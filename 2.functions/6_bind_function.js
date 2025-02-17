const person = {
    firstName:"John",
    lastName: "Doe",
    display: function () {
      console.log( this.firstName + " " + this.lastName);
    }
  }
  //person.display();

 
  setTimeout(person.display, 3000);