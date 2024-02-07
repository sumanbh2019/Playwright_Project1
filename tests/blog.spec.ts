import { expect, test } from '@playwright/test';
import BlogPage from '../pages/blog.page';


test.describe('Blog Page Test Cases', ()=>{
    let blogPage: BlogPage;
    test('to check length of Blogs', async ({ page }) => {

        blogPage = new BlogPage(page);

        await blogPage.navigateToBlog();

        const recentPostsCount =  blogPage.recentPostsList;
        expect((await recentPostsCount.count())).toEqual(5); //get the total count of all the li elements  and check whether it is equal to 5

        for (const el of await recentPostsCount.elementHandles()) {
            console.log("(await el.textContent())?.trim()?.length - "+(await el.textContent())?.trim()?.length)

            //here we get individual element from elementHandles and then get it's length by trimming extra spaces and check whether it is greater than 30
            expect((await el.textContent())?.trim()?.length).toBeGreaterThan(12);

    }
    })

})
