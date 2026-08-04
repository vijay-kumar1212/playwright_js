const ExcelJs = require('exceljs');

async function writeExcel2(searchText, replaceText, path) {
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(path);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel2(worksheet, searchText);

    if (!output) {
        console.log(`Search text "${searchText}" was not found in the sheet.`);
        return;
    }

    const cell = worksheet.getCell(output.row, output.column);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(path);
    console.log(`Updated "${searchText}" to "${replaceText}".`);
}

async function readExcel2(worksheet, searchText) {
    const output = { row: -1, column: -1 };

    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, columnNumber) => {
            const currentValue = cell.value;
            if (currentValue !== null && String(currentValue).trim().toLowerCase() === String(searchText).trim().toLowerCase()) {
                output.row = rowNumber;
                output.column = columnNumber;
            }
        });
    });

    return output.row === -1 && output.column === -1 ? null : output;
}

writeExcel2("Passion Fruit", "Papaya", "C:\\Users\\VijayKumar.Panga\\Downloads\\download.xlsx");