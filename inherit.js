// Inheritance is the main pillar in object oriented program
// One class can inherit/acquire the properties, methods of another class
// The class which inherits the other class properties is know as sub class, derived class
// the class who inherited is knows as SuperClass
const Person = require('./Jsobjects')
class Pet extends Person
{
constructor(firstName, Lastname)
{
// here the first step we should call parent class constructor using super keyword
super(firstName, Lastname)
}

get location()
{
    return 'Blue Cross'
}
};

let pet_  = new Pet('Scar', 'Lion');
pet_.fullName();
console.log(pet_.location);