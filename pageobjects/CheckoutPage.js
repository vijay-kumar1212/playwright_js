class CheckoutPage{
    constructor(page)
    {
        this.page = page;
        this.product = page.locator("div li");
        this.checkout = page.getByRole("button",{name :"Checkout"});
    }
    async verifyAddedProductAndCheckout(productName)
    {
        await this.product.first().waitFor();
        await expect(await this.page.getByText(productName)).toBeVisible();
        await this.checkout.click();
        await this.page.waitForLoadState('domcontentloaded')
    }
};
module.exports = {CheckoutPage};