const person = {
    firstName:"John",
    lastName: "Doe",
    display: function () {
      console.log( this.firstName + " " + this.lastName);
    }
  }
  //person.display();

  let per1=
  setTimeout(person.display, 3000);