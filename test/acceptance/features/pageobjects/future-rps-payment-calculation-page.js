const { $ } = require('@wdio/globals')
const CommonActions = require('./common-actions');

const LAND_AREA = "tbody tr:nth-child(3) td:nth-child(2)"
const PAYMENT_AMOUNT = "tbody tr:nth-child(3) td:nth-child(3)"

class FutureRpsPaymentCalculationPage extends CommonActions {

    async validateLandArea (area) {
        await this.elementToContainText(LAND_AREA, area)
    }

    async validatePaymentAmount (amount) {
        await this.elementToContainText(PAYMENT_AMOUNT, amount)
    }
}

module.exports = new FutureRpsPaymentCalculationPage();