const {test, expect, request} = require('@playwright/test');
const {ApiUtils} = require('./utils/ApiUtils')

const loginPayload = { 
   userEmail:"hv5217958@gmail.com",
   userPassword:"Vikram@1805"
   
}

const order_payload = {orders:[{
    country: "Cuba",
    productOrderedId: "6960eac0c941646b7a8b3e68"
}]};


let response;
test.beforeAll( async ()=>
{
const apiContext = await request.newContext();
const apiutils = new ApiUtils(apiContext, loginPayload);
response  = await apiutils.createOrder(order_payload);   
});




test.beforeEach( ()=>
{

});
 

test('@Webst Client App login', async ({ page }) => {
   
   await page.addInitScript(value => {
      window.localStorage.setItem('token', value);
   }, response.token);
   
   
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
   
   
   for(let i=0; i < await rows.count(); ++i)
   {
   const od_id = await rows.nth(i).locator("th").textContent();
   console.log(od_id);
   if(response.orderId.includes(od_id))
   {
      console.log('Match Found')
      rows.nth(i).locator('button').first().click();
      break;
   }
   }
   const orderIdDetails = await page.locator('.col-text').textContent();
   await page.pause();
   expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
  
});