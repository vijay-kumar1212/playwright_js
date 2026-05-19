const {test, expect} = require('@playwright/test');

test('Product purchase flow', async ({browser})=>
{
const context = await browser.newContext();
const page = await context.newPage();
await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
const user_name = page.locator('#userEmail');
const pass_word = page.locator('#userPassword');
const log_in_btn = page.locator('#login');
const products = page.locator('.card-body');
const productName = 'ZARA COAT 3'
const cart = page.locator('[routerlink*=cart]');
//order checkout page
const country_selector = page.locator("[placeholder='Select Country']");
const dropdown = page.locator('.ta-results');
//payment page
const cvv = page.locator("//div[contains(text(), 'CVV Code ')]/following-sibling::input");
const name_on_card = page.locator("div.field",{hasText:'Name on Card '}).locator('input.input');
const coupon = page.locator('[name="coupon"]');
const year_exp = page.locator('select.input').nth(1);
const apply_coupon = page.getByRole('button').filter({hasText: 'Apply Coupon'});
const coupon_msg = page.locator('[style="color: green;"]');
const place_order = page.locator('a.btnn');
const order_conf = page.locator('h1.hero-primary');


// perform login
await user_name.fill('hv5217958@gmail.com');
await pass_word.fill('Vikram@1805');
await log_in_btn.click();
await page.waitForLoadState('networkidle');
await page.locator('.card-body b').first().waitFor();

const titles = await page.locator('.card-body b').allTextContents();
console.log(titles);
const count = await products.count();

for(let i=0; i < count; ++i)
{
    if(await products.nth(i).locator('b').textContent() === productName)
    {
        // add item to cart
        await products.nth(i).locator("text = Add To Cart").click();
        break;
    }
}
await cart.click();
await page.locator('div li').first().waitFor();
const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
await expect(bool).toBeTruthy();
await page.locator('text=Checkout').click();
await cvv.fill('456');
await year_exp.selectOption('29');
await name_on_card.fill('Rahulshetty');
await coupon.fill('rahulshettyacademy');
await apply_coupon.click();
await expect(coupon_msg).toBeVisible();




//await country_selector.fill('Ind'); // this method will directly fill ind but we have type letters one by one to get dynmic dropdown suggestion
await country_selector.pressSequentially('Ind', {delay:150}); //Here, a delay of 150 milliseconds is introduced between each key
await dropdown.waitFor();
const options_count = await dropdown.locator('button').count();
for(let i = 0; i < options_count; ++i)
{
    const text = await dropdown.locator('button').nth(i).textContent();
    if(text === " India")
    {
        await dropdown.locator('button').nth(i).click();
        break;
    }
}
await expect(page.locator('.user__name [type="text"]').first()).toHaveText('hv5217958@gmail.com');

await place_order.click();
await expect(order_conf).toHaveText(' Thankyou for the order. ');
const order_id = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
console.log(order_id);

// order_history page
const orders_btn = page.getByRole('button', {name:/ORDERS/i});
await orders_btn.click();
const rows = page.locator('tr.ng-star-inserted');
await rows.first().waitFor();

for(let i=0; i < await rows.count(); ++i)
{
 const od_id = await rows.nth(i).locator("th[scope='row']").textContent();
 console.log(od_id);
 if(order_id.includes(od_id))
 {
    console.log('Match Found')
    rows.nth(i).locator('button').first().click();
    break;
 }
}
const order_deatails = await page.locator('.col-text').textContent();
expect(order_id.includes(order_deatails)).toBeTruthy();
await page.pause();

});