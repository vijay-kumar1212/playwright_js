// to print we have function console.log()

console.log("Vijay Panga")

// we can use /* */ for multiline commenting

/*
here we can
write multiple comments in multiple lines
*/

// for defining a variable we need to mention a keyword var upto ES5  version 
// in ES6 version we have let and const keywords.

var a = 45;

let b = 47.89;
const c = 89;
console.log(a, b, c);
console.log(typeof(c), typeof(b));
/*
We can't redeclare a variable with let keyword ut possible with var

The commonly used data tyes in JS are number, string, boolean, null, undefined

If we define a variable with const keyword we can't reassign it will remain constatnt throughout the script


*/

let required = true;
//  let b = 56 this will throw an error as let will not allow redeclaring 
//If we define a variable with const keyword we can't reassign it will remain constatnt throughout the script
b = 56 // reassigning is allowed with let var b = 78 also allowed
console.log(required);
// by using ! we can reverse the boolean values
console.log(!required);

const flag = true;
if(!flag)
{
console.log('Condition Satisfied')
}
else
{
console.log('Condition not satisfied')
}

//while loop
i = 0
while(i <10)
{
console.log('I am inside a loop')
i ++
console.log(i)
}

// if we want execute the loop one round irrespective of condition we can use do while loop

do
{
i ++
}while(i < 10);
console.log(i);


// for loop
let n = 0
for(let k = 0; k<=100; k++)
{
    
    if(k % 2 == 0 && k % 5 == 0) // or condition we have to use || and operation &&
    {
        n ++
        console.log(k)
        if(n==3)
        {
            break
        }

    }
}

// use for loop when you know how many times we have to run the loop, where as while loop will run till the condition become false
