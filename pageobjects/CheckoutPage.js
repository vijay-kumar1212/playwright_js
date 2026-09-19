class CheckoutPage{
    constructor(page)
    {
        this.page = page;
        this.product = page.locator("div li");
        this.checkout = page.getByRole("button",{name :"Checkout"});
        this.countrySelector = page.getByPlaceholder("Select Country");
        this.country = page.getByRole("button",{name : "India"}).nth(1);
        this.placeOrder = page.getByText("PLACE ORDER");
        this.orderConfirmation = page.getByText("Thankyou for the order.");
    }
    async verifyAddedProductAndCheckout(productName)
    {
        await this.product.first().waitFor();
        await expect(await this.page.getByText(productName)).toBeVisible();
        await this.checkout.click();
        await this.page.waitForLoadState('domcontentloaded')
    }
    async plcaeOrderForIndia()
    {
        await this.countrySelector.pressSequentially('ind');
        await this.country.click();
        await this.placeOrder.click();
        await expect(this.orderConfirmation).toBeVisible();
    }
};
module.exports = {CheckoutPage};

// in POM we have page object manager as well this is nothing but a class which will create 
// the object of all the page objects and return it to the test file so that we can use it in the test file.
// instead of creating the object of each page object in the test file we can create the object of page object manager
//  and use it to get the object of all the page objects.