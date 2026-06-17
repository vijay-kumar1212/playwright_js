// Setup

const {test, expect, request} = require("@playwright/test");
const { json } = require("node:stream/consumers");


const BASE_URL = "https://eventhub.rahulshettyacademy.com";

const Credentials =  {user_name: "hv5217958@gmail.com",
    password: "Vikram@1805"
};

// - Define two mock response objects as constants before your tests: (Use below Mock response object as it is in your test)

// - SIX_EVENTS_RESPONSE — a JSON object with data array of 6 event objects and pagination (total: 6)



const SIX_EVENTS_RESPONSE = {
  data: [
    { id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
    { id: 2, title: 'Rock Night Live',  category: 'Concert',    eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
    { id: 3, title: 'IPL Finals',       category: 'Sports',     eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },
    { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },
    { id: 5, title: 'Lollapalooza India', category: 'Festival', eventDate: '2025-06-20T12:00:00.000Z', venue: 'Mahalaxmi Racecourse', city: 'Mumbai', price: '3000', totalSeats: 5000, availableSeats: 2000, imageUrl: null, isStatic: false },
    { id: 6, title: 'AI & ML Expo',    category: 'Conference',  eventDate: '2025-06-25T10:00:00.000Z', venue: 'Bangalore International Exhibition Centre', city: 'Bangalore', price: '750', totalSeats: 300, availableSeats: 180, imageUrl: null, isStatic: false },
  ],
  pagination: { page: 1, totalPages: 1, total: 6, limit: 12 },
};


// - FOUR_EVENTS_RESPONSE — same shape but only 4 events in data (total: 4)



const FOUR_EVENTS_RESPONSE = {
  data: [
    { id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
    { id: 2, title: 'Rock Night Live',  category: 'Concert',    eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
    { id: 3, title: 'IPL Finals',       category: 'Sports',     eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },
    { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },
  ],
  pagination: { page: 1, totalPages: 1, total: 4, limit: 12 },
};


// - Write a loginAndGoToEvents(page) helper that logs in and then navigates to /events
async function loginAndGoToEvents(page){
    const mail_id = await page.getByPlaceholder("you@email.com");
        const psw = await page.locator("#password");
        const sign_in = await page.getByRole("button", {name:"Sign In"});
        const event_navigator = page.locator("#nav-events");
        await mail_id.fill(Credentials.user_name);
        await psw.fill(Credentials.password);
        await sign_in.click();
        await event_navigator.click();

}


test("Banner IS visible when 6 events are returned", async ({page})=>
    {
        
        // Step 1 — Set up the API mock

        // - Intercept all requests matching **/api/events** using page.route()

        // - In the handler, call route.fulfill() with status 200, content type application/json, and body set to JSON.stringify(SIX_EVENTS_RESPONSE)

        // - The mock must be registered before navigating to the events page
        page.route("**/api/events**", async route =>{
        const Originalresponse = await page.request.fetch(route.request());
        let body_ = await JSON.stringify(SIX_EVENTS_RESPONSE)
        route.fulfill({response:Originalresponse,
            status: 200,
            body: body_});
        });
        await page.goto(BASE_URL);

        // Step 2 — Login and navigate

        // - Call your loginAndGoToEvents(page) helper

        await loginAndGoToEvents(page)
       
        // Step 3 — Verify cards loaded from mock

        // - Get all event cards by data-testid="event-card"
        await page.locator('[data-testid="event-card"]').first().waitFor();
        const event_Cards = page.locator('[data-testid="event-card"]');

        // - Assert first card is visible
        await expect(event_Cards.first()).toBeVisible();

        // - Assert card count equals exactly 6
        const cards_count = await event_Cards.count()
        console.log(cards_count)
        
        await expect(event_Cards).toHaveCount(6);
        
        // Step 4 — Verify banner is visible

        // - Locate the banner using a case-insensitive text regex: /sandbox holds up to/i
        await page.pause();
         const sandbox = page.locator('div').filter({ hasText: /sandbox holds up to/i}).nth(1);
        // - Assert it is visible
        await expect(sandbox).toBeVisible();
        // - Assert it contains text 9 bookings
        await expect(sandbox.textContent()).toContain('9 bookings');
        

        // await page.pause();
    });

// Test 2 — Banner is NOT visible when 4 events are returned

test("Banner is NOT visible when 4 events are returned", async ({page})=>
    {
        
        // Step 1 — Set up the API mock

        // - Intercept all requests matching **/api/events** using page.route()

        // - In the handler, call route.fulfill() with status 200, content type application/json, and body set to JSON.stringify(SIX_EVENTS_RESPONSE)

        // - The mock must be registered before navigating to the events page
        page.route("**/api/events**", async route =>{
        const Originalresponse = await page.request.fetch(route.request());
        let body_ = await JSON.stringify(FOUR_EVENTS_RESPONSE)
        route.fulfill({response:Originalresponse,
            status: 200,
            body: body_});
        });
        await page.goto(BASE_URL);

        // Step 2 — Login and navigate

        // - Call your loginAndGoToEvents(page) helper

        await loginAndGoToEvents(page)
       
        // Step 3 — Verify cards loaded from mock

        // - Get all event cards by data-testid="event-card"
        await page.locator('[data-testid="event-card"]').first().waitFor();
        const event_Cards = await page.locator('[data-testid="event-card"]');

        // - Assert first card is visible
        expect(await event_Cards.first()).toBeVisible();

        // - Assert card count equals exactly 4
        const cards_count = await event_Cards.count()
        console.log(cards_count)
        
        await expect(event_Cards).toHaveCount(4);
        await page.screenshot()
        
        // Step 4 — Verify banner is hidden

        // - Locate the banner using a case-insensitive text regex: /sandbox holds up to/i
        await page.pause();
         const sandbox = page.locator('div').filter({ hasText: /sandbox holds up to/i}).nth(1);
        // - Assert it is not visible
        await expect(sandbox).not.toBeVisible();

    });

