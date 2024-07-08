const { Given, When, Then } = require('@wdio/cucumber-framework');
const LoginPage = require('../pageobjects/future-rps-login-page');
const EligibilityPage = require('../pageobjects/future-rps-eligibility-evaluation-page');
const LandActionsPage = require('../pageobjects/future-rps-land-actions-page');
const PaymentsPage = require('../pageobjects/future-rps-payment-calculation-page');

let landQuantity

const pages = {
    login: LoginPage
}

Given(/^Sarah is on the Rural Payments Service (\w+) page$/, async function (page) {
    await pages[page].open()
    await LoginPage.login()
});

When(/^Sarah is eligible to apply for funding$/, async function () {
    await EligibilityPage.chooseSarahsFarm()
    await EligibilityPage.selectYesOnMapDetails()
    await EligibilityPage.selectYesOnManagementControlOfLand()
    await EligibilityPage.selectYesOnHEFERConfirmation()
    await EligibilityPage.selectYesOnSSIConsent()
    await EligibilityPage.selectYesOnInheritanceTaxExemption()
    await EligibilityPage.selectYesOnPublicBodies()
    await EligibilityPage.clickContinueButton()
});

When(/^Sarah selects the land parcel and the quantity (.*) she wants to apply for funding$/, async function (quantity) {
    landQuantity = quantity
    await LandActionsPage.selectLandParcel()
    await LandActionsPage.selectCheckBox()
    await LandActionsPage.enterQuantity(landQuantity)
});

Then(/^Sarah is shown (.*) amount she will receive$/, async function (payment) {
    await PaymentsPage.validateLandArea(landQuantity)
    await PaymentsPage.validatePaymentAmount(payment)
});

