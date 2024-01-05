import { test, expect } from '@playwright/test'
import path = require('path');

test.describe('Waits in Playwright', () => {

    test('test case for Hardcoded wait', async ({ page }) => {

        //Open Url
        await page.goto('https://practice.sdetunicorns.com/cart/')

        // Store Test File path
        const filePath = path.join(__dirname, '../data/3m_image.jpg');

        //Upload Test File
        await page.setInputFiles('input#upfile_1', filePath);

        // Click Submit Button
        await page.locator('input#upload_1').click();

        //hardcoded sleep - WRONG WAY
        await page.waitForTimeout(5000);

        //Assertion
        await expect(page.locator('#wfu_messageblock_header_1_label_1')).toContainText('3m_image.jpg uploaded successfully');
    })

    test('test case for Conditional Wait', async ({ page }) => {

        //Open Url
        await page.goto('https://practice.sdetunicorns.com/cart/')

        // Store Test File path
        const filePath = path.join(__dirname, '../data/3m_image.jpg');

        //Upload Test File
        await page.setInputFiles('input#upfile_1', filePath);

        // Click Submit Button
        await page.locator('input#upload_1').click();

        //Conditional sleep - RECOMMENDED WAY
        await page.locator('#wfu_messageblock_header_1_label_1').waitFor({state: 'visible', timeout: 10000})

        //Assertion
        await expect(page.locator('#wfu_messageblock_header_1_label_1')).toContainText('3m_image.jpg uploaded successfully');
    })

    test('test case for Assertion Wait', async ({ page }) => {

        //Open Url
        await page.goto('https://practice.sdetunicorns.com/cart/')

        // Store Test File path
        const filePath = path.join(__dirname, '../data/3m_image.jpg');

        //Upload Test File
        await page.setInputFiles('input#upfile_1', filePath);

        // Click Submit Button
        await page.locator('input#upload_1').click();

        //Assertion without Wait
        await expect(page.locator('#wfu_messageblock_header_1_label_1')).toContainText('3m_image.jpg uploaded successfully', { timeout: 10000});
    })
})