const {test, expect, request} = require('@playwright/test');


const loginPayload = { 
   userEmail:"hv5217958@gmail.com",
   userPassword:"Vikram@1805"
   
}

const order_payload = {orders:[{
    country: "Cuba",
    productOrderedId: "6960eac0c941646b7a8b3e68"
}]};


let token;
let orderId;
test.beforeAll( async ()=>
{
   const api_context = await request.newContext();
   const login_response = await api_context.post('https://rahulshettyacademy.com/api/ecom/auth/login',
      {
         data:loginPayload
      });
   expect(login_response.ok()).toBeTruthy();
   const loginRespJson = await login_response.json();
   token = loginRespJson.token;
   console.log(token);

   const order_response = await api_context.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
      data: order_payload,
      headers:{
         'Authorization':token,
         'Content-Type':"application/json"},
   });
   const orderResponseJson = await order_response.json();
   orderId = await orderResponseJson.orders[0];
   console.log(orderId);
});

test.beforeEach( ()=>
{

});
 

test('@Webst Client App login', async ({ page }) => {
   
   await page.addInitScript(value => {
      window.localStorage.setItem('token', value);
   }, token);
   //js file- Login js, DashboardPage
   const email = "anshika@gmail.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
   
   
   for(let i=0; i < await rows.count(); ++i)
   {
   const od_id = await rows.nth(i).locator("th").textContent();
   console.log(od_id);
   if(orderId.includes(od_id))
   {
      console.log('Match Found')
      rows.nth(i).locator('button').first().click();
      break;
   }
   }
   await page.pause();
  
});