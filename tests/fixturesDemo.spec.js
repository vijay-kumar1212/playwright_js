const {test, expect, request} = require('@playwright/test')
const {customtest} = require('./utils/fixtures.js');



customtest("Fixture's Demo", async ({authenticatedPage,createOrder, testDataForOrder})=> 
    {
        // login to application and verify the order is created successfully
        await authenticatedPage.goto("https://rahulshettyacademy.com/client");
        await authenticatedPage.waitForLoadState('networkidle');
        await authenticatedPage.locator("button[routerlink*='myorders']").click();
        await authenticatedPage.locator("tbody").waitFor();
        // await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible();
        console.log("test Data for order is: ", testDataForOrder);
    });