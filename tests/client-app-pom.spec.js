const {test, expect} = require('@playwright/test');
const {customtest} = require('../utils/test-base.js');
const {LoginPage} = require('../pageobjects/LoginPage.js');
const { DashboardPage } = require('../pageobjects/DashBoardPage.js');
const { CheckoutPage } = require('../pageobjects/CheckoutPage.js');
const testData = require("../utils/placeOrderTestData.json");


/* To convert json object into string we use JSON.stringify() 
and to convert string into json object we use JSON.parse()
but here require() already parses .json files into a JavaScript object.
*/

// we can achieve parametrization by using for loop.

for (const data of testData)
    {
test(`client app login ${data.productName}`, async ({page})=> 
    {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        const checkoutPage = new CheckoutPage(page);
        await loginPage.goTo();
        await loginPage.validLogin(data.username, data.password);
        await dashboardPage.searchProductAddToCart(data.productName);
        await dashboardPage.navigateToCart();
        await checkoutPage.verifyAddedProductAndCheckout(data.productName);
        await checkoutPage.placeOrderForIndia();
});
};

// we can send test data as a fixture as well.

customtest('client app login ', async ({page, testDataForOrder})=> 
    {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        const checkoutPage = new CheckoutPage(page);
        await loginPage.goTo();
        await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
        await dashboardPage.searchProductAddToCart(testDataForOrder.productName);
        await dashboardPage.navigateToCart();
    });
