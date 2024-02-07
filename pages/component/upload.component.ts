import { Locator, Page } from '@playwright/test'

class UploadComponent {
    private page: Page;
    uploadInput: string;
    submitBtn: Locator;
    successTxt: Locator;

    constructor(page: Page) {
        this.page = page;
        this.uploadInput = 'input#upfile_1'
        this.submitBtn = page.locator('input#upload_1')
        this.successTxt = page.locator('#wfu_messageblock_header_1_label_1')
    }

    async uploadFile(filePath: string) {
        //Upload Test File
        await this.page.setInputFiles(this.uploadInput, filePath);

        // Click Submit Button
        await this.submitBtn.click();
    }
}

export default UploadComponent;