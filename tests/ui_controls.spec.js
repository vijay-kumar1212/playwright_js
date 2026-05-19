const {test, expect} = require('@playwright/test')


test('UI Controls', async ({browser})=>
{
const context = await browser.newContext();
const page = await context.newPage();
await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
const  userName = page.getByLabel('Username:');
const signInButton = page.locator('#signInBtn');
const cardTitles = page.locator('.card-body a');
const documentLink = page.locator('[href*="documents-request"]');
const dropdown = await page.locator('select.form-control');
console.log(await page.title());
await userName.fill('rahulshettyacademy');
await page.locator('#password').fill('Learning@830$3mK2');
await dropdown.selectOption('consult');
await page.locator('.radiotextsty').last().click();
await page.locator('#okayBtn').click();
console.log(await page.locator('.radiotextsty').last().isChecked());
await expect(page.locator('.radiotextsty').last()).toBeChecked(); // inn this line we are performimg acttion outside of expect thats why we mentioned await at first
await page.locator('#terms').click();
await expect(page.locator('#terms')).toBeChecked();
await page.locator('#terms').uncheck();
expect(await page.locator('#terms').isChecked()).toBeFalsy(); // here we are performing action ischecked inside an expect assertion thats why we have written await inside the assertion expect
await expect(documentLink).toHaveAttribute('class', 'blinkingText');

//Handling child windows

// in java if we want to run the 2 functions asynchronously we have to use Promise.all() mehtod in all we have to provide an array of commands
const [newpage] = await Promise.all(
[context.waitForEvent('page'), // listen for amy new page pending , rejected, fulfilld
documentLink.click(),   // new page will be initiated this will be after defining the listener context.waitforevent
])

const text = await newpage.locator('.red').textContent();
console.log(text);
const arrayText = text.split('@')
const domain = arrayText[1].split(' ')[0]
console.log(domain);
await userName.fill(domain);
console.log(await userName.inputValue()); // will grab user input values in the input fields
await page.pause(); // will pause the scrip and open playwright inspector
// await signInButton.click();

});