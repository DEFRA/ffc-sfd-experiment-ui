const { Given, When, Then } = require('@wdio/cucumber-framework');
const LoginPage = require('../pageobjects/future-rps-login-page');
const EligibilityPage = require('../pageobjects/future-rps-eligibility-evaluation-page');
const LandActionsPage = require('../pageobjects/future-rps-land-actions-page');
const PaymentsPage = require('../pageobjects/future-rps-payment-calculation-page');
const commonAPICalls = require('../utils/common-api-calls');
const { waitFor } = require('@babel/core/lib/gensync-utils/async')

const pages = {
    login: LoginPage
}

let available_area_for_land_action = 0

Given(/^(.*) is on the Rural Payments Service (\w+) page$/, async function (farmer, page) {
    await pages[page].open()
    await LoginPage.login()
});

When(/^(.*) is eligible to apply for funding$/, async function (farmer) {
    await EligibilityPage.chooseFarm(farmer)
    await EligibilityPage.answerQuestionsForEligibility()
});

When(/^(.*) selects the land parcel type of (.*)$/, async function (farmer, landType) {
    await LandActionsPage.selectLandParcel(landType)
});

When(/^the (.*) has the (.*) and (.*) hectare requirement$/, async function (action, min, max) {
    await commonAPICalls.updateMinParcelArea(action, min)
    await commonAPICalls.updateMaxParcelArea(action, max)
});

When(/^(\w+) chooses to apply for (.*) for (.*) hectares$/, async function (farmer, action, available_area) {
    available_area_for_land_action = available_area
    await LandActionsPage.selectAction(action)
    await LandActionsPage.enterQuantityForAction(action,available_area_for_land_action)
});

Then(/^(.*) is shown (.*) she will receive for this (.*)$/, async function (farmer, payment_amount, action) {
    await PaymentsPage.validateActionName(action)
    await PaymentsPage.validateLandArea(available_area_for_land_action)
    await PaymentsPage.validatePaymentAmount(payment_amount)
});

Then(/^Sarah is shown the error message that the area is below the minimum requirement$/, async function () {
    await LandActionsPage.validateErrorMessage('GRH1: The parcel must have a total area of at least 15ha')
});
Then(/^Sarah is shown the error message that the area applied for does not match the land parcel area$/, async function () {
    await LandActionsPage.validateErrorMessage('CSAM1: Area applied for (4.2ha) does not match parcel area (8.4ha)')
});