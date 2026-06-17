const {test, expect} = require('@playwright/test')

const login_payload = {password: "Lbr12345",
                       username:"shaibuddin"};

let browserContext;
test.beforeAll(async ({browser})=>{
const context = await browser.newContext();
const page = await context.newPage();
await page.goto('https://host-app-f-sports-mn-virtual-edp-layout-fvt.int.ladbrokes.com/en/sports');
const log_in_btn = page.locator('//span[contains(text(), "Login")]');
await page.getByText('Let’s Go').first()
// await page.locator(".cta desktop-only").click();
await page.locator('id="onetrust-accept-btn-handler"').click();


await log_in_btn.click();
const user_name = page.locator('#userId');
const password = page.locator('//input[@name="password"]');
const login = page.locator('//span[contains(text(), " LOG IN ")]');
await user_name.fill('Shaibuddin');
await password.fill('Lbr12345');
await expect(login).toBeEnabled();
await login.click();
await page.pause();
await context.storageState({path: 'lstate.json'})
browserContext = await browser.newContext({storageState:'lstate.json'});
});




test('Ladbrokes login with api', async ()=>
{
const page = await browserContext.newPage();
await page.goto('https://host-app-release-host-app-26-21-0-beta.int.ladbrokes.com/en/sports');
await page.pause();
});