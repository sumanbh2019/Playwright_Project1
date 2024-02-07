import { expect, test } from '@playwright/test';
import ContactPage from '../pages/contact.page';

test.describe('Contact Test Cases', () => {
    let contactPage: ContactPage
    test('to fill contact details and confirm success message', async ({ page }) => {
        contactPage = new ContactPage(page);

        contactPage.navigateToContact();

        await contactPage.submitForm("suman","suman@mail.com","9876543211","This is a sample message")

        // const alertMessage = contactPage.alertMessage
        await expect(contactPage.successTxt).toBeVisible();
        await page.waitForTimeout(3000);

})

})
