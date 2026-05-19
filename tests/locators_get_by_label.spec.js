const {test, expect} = require('@playwright/test');

test('Locators practice using getbyrole, label', async ({browser})=>
{
const context = await browser.newContext();
const page = await context.newPage();
page.goto("https://rahulshettyacademy.com/angularpractice/");

const Name  = page.getByLabel('Name');
//get by label locators, in this for attribute must be there and it should be associate with id attribute in the input label if its wrapped outside of the label tag
//  then only it will work , elemnt should be in label tag
const check_box_ice = page.getByLabel('Check me out if you Love IceCreams!');
const gender_drop_down = page.getByLabel('Gender');
const student_radio = page.getByLabel('Student');
const employed_radio = page.getByLabel('Employed');
const dob = page.getByLabel('Date of Birth');



// await Name.fill('Vijay Kumar');
await check_box_ice.click();
await gender_drop_down.selectOption('Female')
await student_radio.click();
await gender_drop_down.selectOption('Male');
await employed_radio.click();

await page.locator('[name="email"]').fill('hv5217958@gmail.com');
await page.getByPlaceholder('Password').fill('Vikram@1805');
// await dob.fill('14/06/1995');
await page.getByRole('button', {name:'Submit'}).click();
expect(await page.getByText('Success! The Form has been submitted successfully!.').isVisible()).toBeTruthy();
await page.getByRole('link', {name:'Shop'}).click();
await page.locator('app-card').filter({hasText:'Nokia Edge'}).getByRole('button', {name: 'Add'}).click();
await page.pause();

});