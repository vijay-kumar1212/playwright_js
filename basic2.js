// creating an array that stores 6 elements

let marks = Array(6);
let marks_ = new Array(20, 45,56,78,90, 89);

var mark = [20, 45,67, 78, 98, 90];

console.log(mark[0]); // retrieving the value from an array
mark[3] = 144;
console.log(marks, mark);
console.log(typeof(mark), mark.length);
mark.push(108);
console.log(mark);
// to remove the last elemt we can use pop method
mark.pop();
console.log(mark);
//we can add an element at the begining of the array we can use unshift method
mark.unshift(94);
console.log(mark);
// to fetch the index of an elemnt from an array is indexof
console.log(mark.indexOf(67));
console.log(mark.includes(144));
console.log(mark.slice(2,4));
console.log(mark.length);
var sum = 0;
for(let i = 0; i < mark.length; i++)
    {
        console.log(mark[i]);
        sum = sum + mark[i];
    };
    console.log(sum);

// reduce filter map
// to perform sum of the elemnts in the array using reduce function

let total= mark.reduce((sm, m)=>sm+m,0);
console.log(total)

var scores = [12, 13,14, 16]
var event_scores = []
for(let i = 0; i <scores.length; i++)
{
    if(scores[i] % 2 == 0)
    {
        event_scores.push(scores[i])
    }
};
console.log(event_scores);

//another way 
let new_even = scores.filter(score => score%2 == 0);
console.log(new_even);

// map array function map will modify every element in the array

let mappedArray = new_even.map(score => score * 3);
console.log(mappedArray);

let sm_  = mappedArray.reduce((total, t) => total+t, 0);
console.log(sm_);