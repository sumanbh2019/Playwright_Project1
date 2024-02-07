import { test, expect } from "@playwright/test";
import CartPage from "../pages/cart.page";
const path = require('path');

test.describe('Upload File', () => {
    let cartPage: CartPage;

    test('test case to upload a file', async ({ page }) => {
        cartPage = new CartPage(page);

        //Open Url
        await page.goto('https://practice.sdetunicorns.com/cart/')

        // Store Test File path
        const filePath = path.join(__dirname, '../data/image.png');

        cartPage.uploadComponent().uploadFile(filePath);

        //Assertion
        await expect(cartPage.uploadComponent().successTxt).toContainText('image.png uploaded successfully');
    })

    test('test case to upload a file with DOM Manipulation', async ({ page }) => {
         //Open Url
        await page.goto('https://practice.sdetunicorns.com/cart/')

        // Store Test File path
        const filePath = path.join(__dirname, '../data/image.png');

        //DOM Manipulation
        await page.evaluate(() => {
            const selector = document.querySelector('input#upfile_1');
            if (selector) {
                selector.className = '';
            }
        })

        await page.setInputFiles('input#upfile_1', filePath);

        // Click Submit Button
        await page.locator('input#upload_1').click();

        //Assertion
        await expect(page.locator('#wfu_messageblock_header_1_label_1')).toContainText('image.png uploaded successfully');
    })


})
