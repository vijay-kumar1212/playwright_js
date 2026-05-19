const {test, expect} = require('@playwright/test');


test('Browser Context Playwright Test', async ({browser})=>  // here browser is a fixture this is available for every tesyt annotations. this needs to be wrapped in a curly braces to identify it as a playwright fixture

{
// playwright code

// Java Script is asyncronous, i.e. Tasks will not execute sequentially. we need to provide await in between steps or tasks, we have to mark function with async other wise await wont work

// Function that doesn't have any name can be treated as anonymous function. for those functions we can define as ()=>  instead of function()


const context = await browser.newContext();
const page = await context.newPage();
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const  userName = page.getByLabel('Username:');
const signInButton = page.locator('#signInBtn');
const cardTitles = page.locator('.card-body a');
console.log(await page.title());
await userName.fill('rahulshetty');
await page.locator('#password').fill('Learning@830$3mK2');
await signInButton.click();
const error = await page.locator("[style*='block']").textContent();
await expect(page.locator("[style*='block']")).toContainText('Incorrect'); // here we are providing the * so that we can give partial request
await userName.fill("rahulshettyacademy"); // this will remove the username entered previously
// await userName.type('rahulshettyacademy'); // type method us derecated in the latest version
await signInButton.click();
// await page.locator('.card-body a').filter().toHaveTitle('iphone X');
console.log(await cardTitles.first().textContent());
console.log(await cardTitles.nth(1).textContent());
console.log(await cardTitles.allTextContents()); // here allTextContents method will not wait for complete page load it will returns an empty array if page not loaded.


console.log(error)

});


test('Home work on getting text of element', async({browser})=>
{
const context = await browser.newContext();
const page = await context.newPage();
await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
const user_name = page.locator('#userEmail');
const pass_word = page.locator('#userPassword');
const login_button = page.locator('#login');
await user_name.fill('hv5217958@gmail.com');
await pass_word.fill('Vikram@1805');
await login_button.click()
const cardTitle = page.locator('.card-body b');
console.log(await cardTitle.allTextContents()); // here it will print an empty array why because the allTextcontent will not wait for elements to be load
// to make the script to wait dynamically we have below below method as the info we receiving from api calls to wait untill newtowrk calls are idle
await page.waitForLoadState('networkidle');
// Above waitforload method is behaving flaky sometimes at that time you may use below
await cardTitle.first().waitFor(); // this will wait for single element so we have to mention which element i.e index first() or nth(x)
console.log(await cardTitle.allTextContents());
const first_card = await cardTitle.first().textContent();
console.log(first_card);
});

test("Page Playwright Test", async({page})=>   // if we mention .only only that test will run i.e test.only
{
    await page.goto("https://google.com")
    // get the title
    console.log(await page.title());

    // assertions

    await expect(page).toHaveTitle('Google')
}
);
