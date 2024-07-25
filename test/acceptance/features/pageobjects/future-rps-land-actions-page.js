const { $ } = require('@wdio/globals')
const CommonActions = require('./common-actions');

const SELECT_ARABLE_LAND = "//input[@id='selectedLandParcel']"
const SELECT_PERMANENT_GRASSLAND = "//input[@id='selectedLandParcel-2']"
const SELECT_SAM1_ACTION = "//input[@value='SAM1']"

const SELECT_CONTINUE = "//button[normalize-space()='Continue']"
const ENTER_QUANTITY_FOR_SAM1 = "//input[@name='quantitySAM1']"
const LAND_AREA = "tbody tr:nth-child(3) td:nth-child(2)"
const PAYMENT_AMOUNT = "tbody tr:nth-child(3) td:nth-child(3)"
const SELECT_CHECKBOX = "//input[@name='selectedActionCodes']"

class FutureRpsLandActionsPage extends CommonActions {

    async selectArableLandParcel () {
        await this.clickOn(SELECT_ARABLE_LAND);
        await this.clickOn(SELECT_CONTINUE);
    }

    async selectSam1Action () {
        await this.clickOn(SELECT_SAM1_ACTION);
    }

    async selectPermanentGrasslandParcel () {
        await this.clickOn(SELECT_PERMANENT_GRASSLAND);
        await this.clickOn(SELECT_CONTINUE);
    }

    async selectCheckBox () {
        await this.clickOn(SELECT_CHECKBOX);
    }

    async enterQuantityForSAM1 (quantity) {
        await this.sendKey(ENTER_QUANTITY_FOR_SAM1, quantity);
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