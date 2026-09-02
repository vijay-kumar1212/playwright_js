class DashboardPage {
    constructor(page)
    {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");


    }

    async searchProductAddToCart(productName)
    {
        const titles = await this.productsText.allTextContents();
        console.log(titles)
        const count = await this.products.count();
        for(let i = 0; i < count; ++i)
        {
            if(await this.products.nth(i).locator('b').textContent() === productName)
            {
                // added to cart
                // the below is the example for chaining of locator
                await this.products.nth(i).locator('text = Add To Cart').click();
                break
            }
        }
        await this.page.waitForLoadState('networkidle');
    };
    async navigateToCart()
    {
        await this.cart.click();
        await this.page.waitForLoadState('domcontentloaded');
    }
};
module.exports = {DashboardPage};