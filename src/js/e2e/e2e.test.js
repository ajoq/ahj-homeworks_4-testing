import puppeteer from "puppeteer"; 
jest.setTimeout(30000);
describe('Card number form', () => {
    let browser = null;
    let page = null;
    const baseUrl = 'http://localhost:8888';

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: true,
            slowMo: 100,
            devtools: false,
        });
        page = await browser.newPage();
    });

    afterAll(async () => {
        await browser.close();
    });

    test('Valid card number', async () => {
        await page.goto(baseUrl);
        const input = await page.$('.form-group__input');
        await input.type('4929835210176292');
        const button = await page.$('.form-group__button');
        await button.click();
        await page.waitForSelector('.luhn-succes');
    });

    test('Invalid card number', async () => {
        await page.goto(baseUrl);
        const input = await page.$('.form-group__input');
        await input.type('01253');
        const button = await page.$('.form-group__button');
        await button.click();
        await page.waitForSelector('.luhn-error');
    });
})
