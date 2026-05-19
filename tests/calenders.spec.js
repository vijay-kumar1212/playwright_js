const {test, expect} = require('@playwright/test');

test('verify calender', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const monthNumber = '10';
    const day = '26';
    const year = '1998';
    const expectedList = [monthNumber, day, year]
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    const calender_button = page.locator('.react-date-picker__calendar-button');
    const calender_navigator = page.locator('.react-calendar__navigation__label');
    const prev_year = page.locator('[class*="prev-button"]');
    const month = page.locator('.react-calendar__year-view__months__month');


    await calender_button.click();
    await calender_navigator.click();
    
    const text_ = await calender_navigator.textContent();
    while(true)
    {
     const text = await calender_navigator.textContent();
     if(text.includes(year))
     {
        break;
     }
     await prev_year.click();
    }
    const month_name = await await month.nth(Number(monthNumber) - 1).textContent();
    await month.nth(Number(monthNumber) - 1).click();

    
    await page.getByRole('button', {name: month_name+" "+ day,}).click();
    const inputs = await page.locator('.react-date-picker__inputGroup__input');
    for(let i=0; i < expectedList.length; ++i)
    {
        const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(expectedList[i]);

    }
    await page.pause();

});