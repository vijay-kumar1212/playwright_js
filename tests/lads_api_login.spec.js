const {test, expect, request} = require('@playwright/test')

const login_payload = {password: "Lbr12345",
                       username:"shaibuddin"};

let token;
test.beforeAll(async ()=>
{
const api_context = await request.newContext();
const resp = await api_context.post("https://www.ladbrokes.com/en/api/login", {data:login_payload,
    headers:{
" Content-Type": "application/json",
  "Accept": "application/json",
  "User-Agent": "Mozilla/5.0",
  "Origin": "https://www.ladbrokes.com",
  "Referer": "https://www.ladbrokes.com/"
}
});
expect(resp.ok()).toBeTruthy();

console.log("Response object:", resp);
console.log("Status:", resp.status());
console.log("OK:", resp.ok());

const loginResponse = await resp.json();
token = loginResponse.token;
console.log(token);

});

test('Ladbrokes login with api', async ({page})=>
{
await page.addInitScript(value => {window.localStorage.setItem('token', value)}, token)
await page.goto('https://www.ladbrokes.com/en/sports')
await page.pause();
});