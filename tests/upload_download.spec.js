const ExcelJs = require('exceljs');
const {test} = require('@playwright/test');

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

// writeExcel2("Passion Fruit", "Papaya", "C:\\Users\\VijayKumar.Panga\\Downloads\\download.xlsx");

test('Update and excel and upload to browser', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/upload-download-test/');
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', {name: 'Download'}).click();
    const download = await downloadPromise;
    const downloadPath = await download.path();

    if (!downloadPath) {
        throw new Error('Downloaded file path was not available.');
    }

    await writeExcel2("Papaya", "Passion Fruit", downloadPath);
    await page.locator('#fileinput').setInputFiles(downloadPath);
    // to upload the file we have to use setInputFiles() method and we have to pass the path of the file to be uploaded.
    // and respective locator should have type parameter as file in the html element level
    
    const desired_row = await page.locator('#row-2');
    await expect(desired_row.locator('#cell-2-undefined')).toHaveText('Passion Fruit');
    await page.pause();
});