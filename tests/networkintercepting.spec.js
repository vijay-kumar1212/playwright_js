const {test, expect, request} = require('@playwright/test');
const {ApiUtils} = require('../utils/ApiUtils');

const loginPayload = { 
   userEmail:"hv5217958@gmail.com",
   userPassword:"Vikram@1805"
   
}

const order_payload = {orders:[{
    country: "Cuba",
    productOrderedId: "6960eac0c941646b7a8b3e68"
}]};
const fakePayload = {data:[], message: "No Orders"}

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
//    Actual endpoint https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/69e07eeef86ba51a6569dee7
// here we replcaed usrid in endpoint with * so that it will work
   await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
   async route=> {
    // Intercepting response _API Response -> bros=wser -> render the data on the front end
    const response = await page.request.fetch(route.request());
    let body = JSON.stringify(fakePayload);
    route.fulfill(
        {
            response, body
        }
    )
    });
   await page.locator("button[routerlink*='myorders']").click();
   await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*') // here we replcaed usrid in endpoint with * so that it will work for any user id
// here if we get the response from original api with delay we might get error as api context disposed to overcome that we are waiting till response is loaded from the specific endpoint
   //    await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
   const go_to_shop_button = await page.getByRole('button', { name: 'Go Back to Shop' });
   await expect(go_to_shop_button).toBeAttached();
   console.log(await page.getByText('You have No Orders to show at').textContent());
//    await page.pause();
  
});
// we have route.continue({url: "expected url you want to pass "}) we can abort or stop the call using route.abort()
// page.route('**/*.css', route => route.abort()); by using this we are blocking any endpoint ends with css extension so that application will load a bit fast
//"**/*" means any endpoint we can block any extension endpoints as "**/*.{css, jpg,npg, jpeg}"