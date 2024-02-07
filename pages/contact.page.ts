import { Locator, Page, expect } from "@playwright/test";

class ContactPage {
    page: Page;
    nameInput: Locator;
    emailInput: Locator;
    phoneInput: Locator;
    messageTextArea: Locator;
    submitBtn: Locator;
    successTxt: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameInput = page.getByLabel('Name *')
        this.emailInput = page.getByLabel('Email *')
        this.phoneInput = page.getByLabel('Phone *')
        this.messageTextArea = page.locator('.contact-message textarea')
        this.submitBtn = page.getByRole('button', { name: 'Submit' })
        this.successTxt = page.locator('.everest-forms >> text=Thanks for contacting us! We will be in touch with you shortly')
    }

    async navigateToContact() {
        await this.page.goto('https://practice.sdetunicorns.com/');
        await this.page.locator('#zak-primary-menu >> text=Contact').click();
        expect(this.page).toHaveURL(/.*contact/);
    }

    async submitForm(name: string, email: string, phone: string, message: string) {
        await this.nameInput.fill(name);

        await this.emailInput.fill(email);

        await this.phoneInput.fill(phone);

        await this.messageTextArea.fill(message);

        await this.submitBtn.click();

    }
}

export default ContactPage;