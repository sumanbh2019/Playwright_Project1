import { Locator, Page } from "@playwright/test";

class BlogPage{
    page: Page;
    recentPostsList: Locator;

    constructor(page: Page) {
        this.page = page;
        this.recentPostsList = page.locator('#recent-posts-3 li');
    }

    async navigateToBlog() {
        await this.page.goto('https://practice.sdetunicorns.com/blog');
    }

}

export default BlogPage;