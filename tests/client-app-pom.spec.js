const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../pageobjects/LoginPage.js');
const { DashboardPage } = require('../pageobjects/DashBoardPage.js');
const { CheckoutPage } = require('../pageobjects/CheckoutPage.js');

test('client app login', async ({page})=> 
    {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        const checkoutPage = new CheckoutPage(page);
        const email = "hv5217958@gmail.com";
        const password = "Vikram@1805";
        const productName = 'ZARA COAT 3';
        await loginPage.goTo();
        await loginPage.validLogin(email, password);
        await dashboardPage.searchProductAddToCart(productName);
        await dashboardPage.navigateToCart();
        await checkoutPage.verifyAddedProductAndCheckout(productName);
        
                
    
    // //await page.pause();
    // await page.locator("div li").first().waitFor();
    // await expect(page.getByText("ZARA COAT 3")).toBeVisible();
    
    // await page.getByRole("button",{name :"Checkout"}).click();
    
    // await page.getByPlaceholder("Select Country").pressSequentially("ind");
    
    // await page.getByRole("button",{name :"India"}).nth(1).click();
    // await page.getByText("PLACE ORDER").click();
    
    // await expect(page.getByText("Thankyou for the order.")).toBeVisible();
});