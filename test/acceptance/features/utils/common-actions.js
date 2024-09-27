const { browser } = require('@wdio/globals')
const {expect} = require('chai')
const {waitFor} = require("@babel/core/lib/gensync-utils/async");


class CommonActions {
    open (path) {
        const url = 'http://localhost:3600/tech-evaluation/' + path
        return browser.url(url)
    }

    async clickOn (element) {
        const locator = browser.$(element)
        const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs))
        await sleep(20)
        await locator.click()
    }

    async navigateBack(){
        await browser.back()
    }

    async sendKey (element, text) {
        const locator = browser.$(element)
        await locator.setValue(text)
    }

    async elementGetText(element){
        const locator = await browser.$(element)
        let Text =await locator.getText()
        return Text
    }

    async normalizeString(str) {
        return str.normalize('NFKC'); // Normalize using Compatibility Decomposition followed by Canonical Composition
    }

    async elementToContainText (element, text) {
        const locator = await browser.$(element)
        let errormessage=await locator.getText()
        this.normalizeString(errormessage)
        console.log(errormessage)
        expect(await locator.getText()).to.include(text)
    }

    async openNewTab(){
        const windowHandles = await browser.getWindowHandles();
        await browser.switchToWindow(windowHandles[1]);
        await this.screenShot()

    }

    async closeNewTab(){
        const windowHandles = await browser.getWindowHandles();
        await browser.closeWindow();
        await browser.switchToWindow(windowHandles[0]);

    }

    async elementTextShouldBe (element, text) {
        const locator = await browser.$(element)
        expect(await locator.getText()).to.equal(text)
    }

    async getPageTitle(expectedTitle) {
        const actualTitle = await browser.getTitle()
        expect(actualTitle).to.be.equal(expectedTitle)
    }

    async urlContain (expectedUrl) {
        const actualUrl = await browser.getUrl()
        expect(actualUrl).to.include(expectedUrl)
    }

    async screenShot(){
        const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs))
        await sleep(5000)
        var date=Date.now();
        const screenshots=await browser.saveScreenshot('./screenShots/chrome-'+date+'.png')
    }

    async doesElementExist (element) {
        const locator = await browser.$(element)
        return locator.isExisting()
    }

    async closeBrowser1() {
        try {
            await browser.closeWindow();
            console.log('Window closed successfully.');
        } catch (error)
            {
                console.error('Error closing the window:', error);
            }
    }
}


module.exports = CommonActions