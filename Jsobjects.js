//Object is a collection of properties

let person = {
    firstName: 'Vijay',
    lastName: 'Panga',
    10:45,
    fullName : function(){
        return this.firstName + this.lastName // by using this keyword we can access its own object properties.
    }
}

console.log(person.firstName);
console.log(person['lastName']);
console.log(person[10])
// console.log(person.10) this line will throw an error
person.firstName = 'Vijay Kumar'
person.gender = 'Male'
console.log(person)
delete person[10]
console.log(person)
// to check any property available in object we can check as below

console.log('gender' in person);
for(let key in person)
{
    if(typeof(person[key]) === 'function')
        {
            console.log(person[key]())
        }
    else
    {
        console.log(person[key])
    }
};

// in JS classes are introduced from ES6 earlier all the properties are hold in object.
console.log('='.repeat(60));
module.exports = class Person // to use this class elsewhere in any any ther file first we need to export it using modules.export then we can import this class where it required uisnf require key word
{
 age = 31
 // by using getter method also we can define the properites

 get location()
 {
    return "Srikakulam"
 }
 //construcotr is a method which executes by default when c=we create an object for a class
 constructor(firstName, Lastname) //here first name and Lastname are instance variables
 {
    this.firstName = firstName
    this.Lastname = Lastname
 }
 fullName(){
    console.log(this.firstName + " " + this.Lastname)
 }
};

//creating an object for a class

// let persn = new Person('Vijay Kumar', 'Panga');
// console.log(persn.age);
// console.log(persn.location);
// persn.fullName();
/**
 * if we have multiple classes in same file we need to export them as module.exports = {Person, Employee};
 * module.exports = { Person, Employee };
 * 
 * 
class Person {
   constructor(name) {
      this.name = name;
   }

   fullName() {
      console.log(this.name);
   }
}

class Employee {
   constructor(id) {
      this.id = id;
   }

   showId() {
      console.log(this.id);
   }
}

module.exports = { Person, Employee };

 */