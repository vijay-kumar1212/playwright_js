// what is fixtures.js? 
// fixtures.js is a file that contains test data or mock data that can be used in unit tests or integration tests.
// fixture is a reusable unit of setup and teardown code that playwright injects into  a test by matching parameter names -- runs efore the test, handsoff a ready-to-use
// object via use(), then cleans upautomatically after.
// It helps to provide consistent and reusable data for testing purposes, allowing developers to simulate different scenarios and validate the behavior of their code.
// 

// here exteding the base test class of playwright to create our own custom test class with fixtures. we can use this custom test class in our test cases to use the fixtures defined in it.
// extending the base test class of playwright to create our own custom test class with fixtures. we can use this custom test class in our test cases to use the fixtures defined in it.
// In the below line we imported @playwright/test module instead of test why because the test will not access the custom fixtureswe defined.
// by default it can access the fixtures defined in the playwright fixtures. so we extending the test behavior of playwright test using extend.
const base = require('@playwright/test'); 
const {ApiUtils} = require('./ApiUtils.js');
const {request} = require('@playwright/test');


const loginPayload = {userEmail: 'hv5217958@gmail.com', userPassword: 'Vikram@1805'};

 exports.customtest = base.test.extend({
    // In the abovelien customtest is property name we are attaching to the test object returned by playwright's test.extend() method. like we updating a dictionary with a new key-value pair. the key is the name of the fixture and the value is an async function that defines the fixture's behavior. thats why we are not using const or let.
    // Playwright's test.extend() returns a new test object with additional fixtures attached.
    authenticatedPage: async ({page}, use) => {
        // Perform login or authentication steps here
        await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
        const user_name = page.locator('#userEmail');
        const pass_word = page.locator('#userPassword');
        const login_button = page.locator('#login');
        await user_name.fill('hv5217958@gmail.com');
        await pass_word.fill('Vikram@1805');
        await login_button.click();
        await page.waitForLoadState('networkidle');
        await use(page); // this will pass the page object to the authenticated page to the test case that uses this fixture
    },
    createOrder: async ({}, use) => {
        const apiContext = await request.newContext();
        const apiutils = new ApiUtils(apiContext, loginPayload);
        const response  = await apiutils.createOrder({orders:[{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]});
        await use(response);
        // if we have any block of code after use() this will execute after complete execution of the test.
        // that's why we can call this block as tear down block of code. this will execute after the test case is executed. so we can use this block to clean up any resources or data that were created during the test.
        await apiContext.dispose();
    },
    testDataForOrder : {
        productName: "adidas original",
    }

});