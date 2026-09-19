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


// q4: Count the number of times a given number appears in an array using for...of loop?
function count_given_numbers(arr, num)
{
    let count = 0;
    for(const i of arr)
    {
        if(i === num)
        {
            count++;
        }
    }
    return count;
}
console.log(count_given_numbers([1, 2, 3, 2, 5, 6, 1, 2, 3, 4, 5, 6], 2)); // this will return 2 as there are two 2s in the array


//  write program that computes the greatest common divisor (GCD) of two positive integers.
function computeGcd(a, b)
{
    let min = Math.min(a, b);
    let gcd = 1;
    for(let i = 1; i <= min; i++)
    {
        if(a % i === 0 && b % i ===0 && gcd <= i)
        {
            gcd = i;
        }
    }
    return gcd
}

console.log(computeGcd(12, 18)); // this will return 6 as the GCD of 12 and 18 is 6