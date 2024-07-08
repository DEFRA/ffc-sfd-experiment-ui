const { $ } = require('@wdio/globals')
const CommonActions = require('./common-actions');

const SELECT_LAND = "//input[@id='selectedLandParcel']"
const SELECT_CONTINUE = "//button[normalize-space()='Continue']"
const ENTER_QUANTITY = "//input[@name='quantitySAM2']"
const LAND_AREA = "tbody tr:nth-child(3) td:nth-child(2)"
const PAYMENT_AMOUNT = "tbody tr:nth-child(3) td:nth-child(3)"
const SELECT_CHECKBOX = "//input[@name='selectedActionCodes']"

class FutureRpsLandActionsPage extends CommonActions {

    async selectLandParcel () {
        await this.clickOn(SELECT_LAND);
        await this.clickOn(SELECT_CONTINUE);
    }

    async selectCheckBox () {
        await this.clickOn(SELECT_CHECKBOX);
    }

    async enterQuantity (quantity) {
        await this.sendKey(ENTER_QUANTITY, quantity);
        await this.clickOn(SELECT_CONTINUE);
    }

    async validateLandArea (area) {
        await this.elementToContainText(LAND_AREA, area)
    }

    async validatePaymentAmount (amount) {
        await this.elementToContainText(PAYMENT_AMOUNT, amount)
    }
}

module.exports = new FutureRpsLandActionsPage();