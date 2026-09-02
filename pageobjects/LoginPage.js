class LoginPage{
    constructor(page)
    {
        //the below this will be used in the test file to access the locators.
        // which means the locotors defined using this will be available through of this class.
        this.page = page;
        this.signInButton = page.locator('#login')
        this.userName = page.locator('#userEmail')
        this.password = page.locator('#userPassword')
    };
    async goTo()
    {
        await this.page.goto("https://rahulshettyacademy.com/client", { waitUntil: 'domcontentloaded' });
    }
    async validLogin(username, password)
    {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        // await page.waitForLoadState('networkidle');
    }

};
module.exports = {LoginPage};