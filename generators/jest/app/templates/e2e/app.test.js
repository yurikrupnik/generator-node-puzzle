const puppeteer = require('puppeteer');

const {
    describe, test, beforeAll, afterAll
} = global;

describe('App', () => {
    let browser;
    let page;
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false
        });

        page = await browser.newPage();
    });

    afterAll(async () => {
        await browser.close();
    });

    test('links', async () => {
        await page.goto('http://localhost:7000');
        const hrefs = await page.$$eval('a', as => as.map(a => a.href));
        console.log('hrefs', hrefs);
    });
});
