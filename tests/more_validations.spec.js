const {test, expect} = require('@playwright/test')

test('Popup validation', async ({page})=>
{
await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
await page.goto('http://google.com');
await page.goBack();
// await page.goForward();
const hide_button = await page.getByRole('button', {name:'Hide'});
const hide_show_elemnt = await page.locator('#displayed-text');
const show_button = await page.getByRole('button', {name:'Show'});
await expect(hide_show_elemnt).toBeVisible();
await hide_button.click();
await expect(hide_show_elemnt).toBeHidden();
// handle dialog alerts
page.on('dialog', dialog => dialog.accept());
await page.locator('#confirmbtn').click();
await page.locator('#mousehover').hover();
const frame = await page.frameLocator('#courses-iframe');
await frame.locator('li a[href*="lifetime-access"]:visible').click(); // here we are using :visible to perform action visible element when we have multiple elements with same locator and others are hidden
const text_check = await frame.locator('.text h2').textContent();
console.log(text_check.split(' ')[1]);
await page.pause();
});