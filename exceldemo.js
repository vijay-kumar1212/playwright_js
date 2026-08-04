// exceljs is javascript package in node module for reading, writing, and manipulating excel spread sheet 
// npm  init will initiate node project, it simply create a hirarchy i.e package.json
// by using npm install exceljs we can install exceljs
// to save the dependency package to package.json we have to use th ecommand npm install exceljs --savedev so that tdependecy entry will be added to package.json


const ExcelJs = require('exceljs');

async function writeExcel(path){
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(path);
    const worksheet = workbook.getWorksheet('Sheet1');
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, columnNumber) => {
            console.log(`Row ${rowNumber} Column ${columnNumber} = ${cell.value}`);
        });
    });

}

// writeExcel("C:\\Users\\VijayKumar.Panga\\Downloads\\download.xlsx");

// console.log("*".repeat(50));
// In the above two lines of code line no 23 will be executed first because it is synchronous and line no 22 will be executed after the completion of line no 21 because it is asynchronous.
//workbook.xlsx.readFile(path) is asynchronous and you're not waiting for the writeExcel() function itself to complete.

//  to over come this issue we can use async await or we can use promise chaining.

// Option 1: Use an async IIFE

( async ()=> {
    await writeExcel("C:\\Users\\VijayKumar.Panga\\Downloads\\download.xlsx");
    console.log("*".repeat(50));
})();


// Here we're creating an anonymous async function (a function without a name).
//  the below syntax is function declaration and it is not allowed in javascript.

async function myFunc() {

}
//  so we have to wrap it in parentheses to tell javascript that treat this as a function expression, not a function declaration.


(async () => {

})

// Last (): Invoke (call) the function immediately

// option 2: Promise chaining

writeExcel("C:\\Users\\VijayKumar.Panga\\Downloads\\download.xlsx").then(() => {
    console.log("%".repeat(60))
});