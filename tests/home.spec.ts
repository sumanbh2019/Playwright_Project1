import { test, expect } from '@playwright/test';
import HomePage from '../pages/home.page';

test.describe('Home', () => {
    let homePage;

    test('Check Home page title', async ({ page }) => {

        //now we can use homePage to interact with home page
        homePage = new HomePage(page);

        //go to URL
        await page.goto('https://practice.sdetunicorns.com/');

        //check Page Title
        await expect(page).toHaveTitle('Practice E-Commerce Site – SDET Unicorns – Helping you succeed in Software Quality.');
    })

    test('Go to About Page', async ({ page }) => {
        //go to URL
        await page.goto('https://practice.sdetunicorns.com/about');

        //check Page Title
        await expect(page).toHaveTitle('About – Practice E-Commerce Site');
    })

    test('click on Get Started Button in Home Page', async ({ page }) => {
        homePage = new HomePage(page);

        await page.goto('https://practice.sdetunicorns.com/');

        //click on locator with ID 'get-started'
        await homePage.getStartedBtn.click();

        //check whether URL has '#getstarted or not
        await expect(page).toHaveURL(/.*#get-started/);
    })

    test('check Text using text selector', async ({ page }) => {
        let homePage = new HomePage(page);

        await page.goto('https://practice.sdetunicorns.com/');

        //get text locator
        const text = await homePage.headingText;

        //check whether locator is visible or not
        await expect(text).toBeVisible();
    })

    test('Verify Home Link enabled using Text and CSS locators', async ({ page }) => {
        let homePage = new HomePage(page);

        await page.goto('https://practice.sdetunicorns.com/');

        //it says go to id 'zak-primary-menu' and then to text 'Home'
        // const textCssLocator = page.locator('#zak-primary-menu >> text=Home');
        const textCssLocator = await homePage.homeLink;

        //check whether the locator is enabled or not
        await expect(textCssLocator).toBeEnabled();
    })

    test('Verify Search Icon visibility using Xpath Locator', async ({ page }) => {
        let homePage = new HomePage(page);

        await page.goto('https://practice.sdetunicorns.com/');

        const searchIconLocator = await homePage.searchIcon;

        await expect(searchIconLocator).toBeVisible();
    })

    test('Verify text of all Navigation links', async ({ page }) => {

        let homePage = new HomePage(page);

        const expectedLinks = [
            "Home",
            "About",
            "Shop",
            "Blog",
            "Contact",
            "My account"
        ];

        await page.goto('https://practice.sdetunicorns.com/');

        //fetch all elements and verify
        const navLocator = await homePage.navLinks;
        expect(await navLocator.allTextContents()).toEqual(expectedLinks);

        //fetch only one element and verify it's presence
        const nthNavLocator = navLocator.nth(3);
        expect(await nthNavLocator.textContent()).toEqual(expectedLinks[3]);

        //fetch last element and verify it's presence
        const lastNavLocator = navLocator.last();
        expect(await lastNavLocator.textContent()).toEqual("My account");

        //fetch first element and verify it's presence
        const firstNavLocator = navLocator.first();
        expect(await firstNavLocator.textContent()).toEqual("Home");

        //to fetch value of all links
        const linkNames = navLocator;

        for (const el of await linkNames.elementHandles()) {
            console.log(await el.textContent());
        }

    })



});
