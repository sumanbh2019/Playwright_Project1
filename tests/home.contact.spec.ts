import { expect, test } from '@playwright/test';

test('to fill contact details and confirm success message', async ({ page }) => {
    await page.goto('https://practice.sdetunicorns.com/');

    await page.locator('#zak-primary-menu >> text=Contact').click();
    expect(page).toHaveURL(/.*contact/);

    await page.getByLabel('Name *').fill("abc");

    await page.getByLabel('Email *').fill("abc@mail.com");

    await page.getByLabel('Phone *').fill("9876543210");

    await page.locator('.contact-message textarea').fill("This is a sample message");

    // soft assertion
    await expect.soft(page.locator('.contact-message textarea')).toHaveText('This is a simple message');

    await page.getByRole('button', { name: 'Submit' }).click();

    const alertMessage = page.locator('.everest-forms >> text=Thanks for contacting us! We will be in touch with you shortly')
    await expect(alertMessage).toBeVisible();
    await page.waitForTimeout(3000);

})

test('to check length of Blogs', async ({ page }) => {
    await page.goto('https://practice.sdetunicorns.com/');

    await page.locator("//ul[@class='zak-primary-menu nav-menu']//a[normalize-space()='Blog']").click();
    await page.waitForLoadState();


    const recentPostsCount =  page.locator('#recent-posts-3 li');
    expect((await recentPostsCount.count())).toEqual(5); //get the total count of all the li elements  and check whether it is equal to 5

    for (const el of await recentPostsCount.elementHandles()) {
        console.log("(await el.textContent())?.trim()?.length - "+(await el.textContent())?.trim()?.length)

        //here we get individual element from elementHandles and then get it's length by trimming extra spaces and check whether it is greater than 30
        expect((await el.textContent())?.trim()?.length).toBeGreaterThan(30);

    }
})