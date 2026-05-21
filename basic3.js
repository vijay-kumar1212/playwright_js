// functions are nothing bu t a block of code to achieve or perform a task

//if we want to create a new functionn we have to use function keyword followed by function name

function add(a, b)
{
return a + b 
};

console.log(add(2,3));

// anonymous function the function which doesn't have function name

let sumOfTwoIntegers = function(c, d)
{
    return c + d
}

console.log(sumOfTwoIntegers(9, 5));


let sumOfTwoNum = (d, e)=> d + e;
console.log(sumOfTwoNum(56, 67));

//var keyword is available upto ES5 version
/*  
var keyword scope is global/function level
*/

var greet = 'Evening'

if(1 == 1)
{
    var greet = 'AfterNoon'
}

function hello()
{
    var greet = 'Morning'
    return greet
}

console.log(greet);
console.log(hello());

// let scope will be in global level or block level {}
// both let and var we can reinitialize i.e reassign the new value but using let keyword we cant redeclarre the variable


let gt = 'Good Morning'

if(1 == 1)
{
    let gt = "After noon"
};

// let gt = 'NIght' this line thrown an error as Identifier 'gt' has already been declared
console.log(gt);

// if we use const  keyword we can't redeclare the variable
//scope of const keyword same as let


//Strings and its methods

let day = 'Thurs day '
console.log(day.length);
console.log(day.slice(0,4));
console.log(day[0]);
day = day.trim();
console.log(day.split(' '))

let date = '23'
let nextdate = '37'
let diff = parseInt(nextdate) - parseInt(date)
console.log(diff);
diff.toString();


// string concatenation

let qoute = day + ' is Funday'
console.log(qoute);
let va = qoute.indexOf(day);
let val = qoute.indexOf('day', 5);// here the if we provide index value 5 means it will skip the first day provide the starting index of second day
console.log(va, val);

let count = 0;
let value = qoute.indexOf('day');
while(value !== -1)
{
    count++
    value = qoute.indexOf('day', value + 1)
};
console.log(count);

// importing a class
const persn = require('./Jsobjects')


let per = new persn('Drakshayani', 'Badana');
per.fullName()