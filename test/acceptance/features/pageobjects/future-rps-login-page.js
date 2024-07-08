const { $ } = require('@wdio/globals')
const CommonActions = require('./common-actions');

const USERNAME = '#username';
const PASSWORD = '#password';
const LOGIN_BUTTON = "#main-content > div > div > form > button";
const DEFRA_USERNAME = 'Sarah';
const DEFRA_PASSWORD = 'test123';
const REJECT_COOKIES = "//button[@value='reject']";

class FutureRpsLoginPage extends CommonActions {

    async login () {
        if (await this.doesElementExist(REJECT_COOKIES)) {
            await this.clickOn(REJECT_COOKIES);
        }
        await this.sendKey(USERNAME, DEFRA_USERNAME);
        await this.sendKey(PASSWORD, DEFRA_PASSWORD);
        await this.clickOn(LOGIN_BUTTON);
    }

    open () {
        return super.open('login');
    }
}

module.exports = new FutureRpsLoginPage();
