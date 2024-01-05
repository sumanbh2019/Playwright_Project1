import { test, expect } from "@playwright/test";
const path = require('path');

test.describe('Upload File', () => {
    test('test case to upload a file', async ({ page }) => {

        // Uploading File

        // Regular Upload

        // 1.Go to Your URL and Find a Tag which have <input type=’file’

        // 2.Use path object from node to get path of the file u want to upload
        // 	const path = require('path');
        //  const filePath = path.join(__dirname, '../data/image.png');
        //  (join method here says that from current directory(__dirname) go one step backward and into data folder and get image.png )

        // 3.Use setInputFiles method in playwright to upload file.
        //  await page.setInputFiles('input#upfile_1', filePath);
        //  (here setInputFiles method uses a selector which has input tag with type as file and path of the file to be uploaded as second parameter )

        // 4.Click on Upload button to upload the file.


        //Open Url
        await page.goto('https://practice.sdetunicorns.com/cart/')

        // Store Test File path
        const filePath = path.join(__dirname, '../data/image.png');

        //Upload Test File
        await page.setInputFiles('input#upfile_1', filePath);

        // Click Submit Button
        await page.locator('input#upload_1').click();

        //Assertion
        await expect(page.locator('#wfu_messageblock_header_1_label_1')).toContainText('image.png uploaded successfully');
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
