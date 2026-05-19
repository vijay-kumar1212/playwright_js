const {test, expect} = require('@playwright/test')

test('Verify the ladbrokes login functionality', async ({browser})=>
{
const context = await browser.newContext();
const page = await context.newPage();
await page.goto('https://www.ladbrokes.com/en/sports');
const log_in_btn = page.locator('//span[contains(text(), "LOG IN ")]');
await log_in_btn.click();
const user_name = page.locator('#userId');
const password = page.locator('//input[@name="password"]');
const login = page.locator('//span[contains(text(), " LOG IN ")]');
await user_name.fill('Shaibuddin');
await password.fill('Lbr12345');
await expect(login).toBeEnabled();
await login.click();
const error_message = await page.locator("vn-message-panel[scope ='login'] .cms-container").textContent();
console.log(error_message);
const avatar = page.locator('.avatar-icon');
await expect(avatar).toBeVisible();
});