/* 
for loop syntax is as follows
for(initialization; condition; increment/decrement)
{
    // code to be executed
}


for ...in loop is used to iterate over the properties of an object,indexes of an array or the characters of a string.
It iterates over the enumerable properties of an object, including inherited properties.

for ...in  => keys/properies/Indexes

for ...of loop is used to iterate over the values of an iterable object,
such as an array, string, or Map. It provides a simpler syntax for iterating over the elements of an iterable.

for ...of  => values

*/

// Q1: Find the square of each item in an array using basic for loop?

let arr = Array(6); // this line will create an array of 6 empty slots
arr = [1, 2, 3, 4, 5, 6];
let arr_square = [];

for(let i = 0; i < arr.length; i++)
    {
        arr_square.push(arr[i] * arr[i]);
    }
console.log(arr_square);

//Q2: Find the square of each item in an array using  for...of loop?

for (const num of arr)
{
   console.log(num * num);
}


const student = {
    name: 'Vikram',
    age: 15,
    grade: 'playschool',
    city: 'Hyderabad'
}

// q3: Iterate over the key value pairs of an object using for...of loop?
for(const [key, value] of Object.entries(student))
{
    console.log(`${key}: ${value}`);
}

console.log("--".repeat(40));

for(const value of Object.values(student))
{
    console.log(value);
}

console.log("--".repeat(40));



for(const key of Object.keys(student))
{
    console.log(key);
}

console.log("--".repeat(40));

// q3: Iterate over the key value pairs of an object using for...in loop?

for(const key in student)
{
    console.log(`${key}: ${student[key]}`); // here we are using backticks not single quotes as we are using template literals to print the key value pairs
}