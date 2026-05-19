//"reduce() iterates over an array and accumulates a result into a single output"
/* 

array.reduce((accumulator, currentValue) => {
  // logic
  return updatedAccumulator;
}, initialValue);


Accumulator (acc) → stores the result as it builds step-by-step
Current value (curr) → current element in the array
Initial value → starting value of accumulator
*/

//Sum of numbers
const numbers = [2,3,4,5,6,9,73];
const total = numbers.reduce((acc, curr)=> acc + curr, 0);
console.log(total);

//flatten an array

const arr1 = [[2,4,6], [4, 6], 9, [10, 0]];
console.log(arr1.reduce((acc, val) => acc.concat(val), []));


/*
✅ 3. Count occurrences
JavaScriptconst fruits = ["apple", "banana", "apple"];const count = fruits.reduce((acc, fruit) => {  acc[fruit] = (acc[fruit] || 0) + 1;  return acc;}, {});console.log(count);// { apple: 2, banana: 1 }Show more lines

✅ 4. Convert array to object
JavaScriptconst users = [  { id: 1, name: "A" },  { id: 2, name: "B" }];const result = users.reduce((acc, user) => {  acc[user.id] = user.name;  return acc;}, {});``Show more lines

✅ 5. Find maximum value
JavaScriptconst nums = [10, 5, 20, 8];const max = nums.reduce((acc, num) => Math.max(acc, num));console.log(max); // 20Show more lines

🔹 When to use reduce()
👉 Use it when:

You want one final result from an array
You need to combine values
You are building:

totals
objects
grouped data
transformations




🔹 When NOT to use it 🚫
Avoid reduce() if simpler methods can do the job:

map() → for transforming arrays
filter() → for filtering
forEach() → for iteration

👉 Because reduce() can be harder to read if overused.

🔹 Simple Analogy 💡
Think of reduce() like:

Putting all items into a blender ➝ you get one final result


✅ Final Summary

reduce() = turn an array into a single value
Uses an accumulator to build result step-by-step
Very useful but should be used carefully for readability
*/