const { Given, When, Then } = require('@wdio/cucumber-framework');
const LoginPage = require('../pageobjects/future-rps-login-page');
const EligibilityPage = require('../pageobjects/future-rps-eligibility-evaluation-page');
const LandActionsPage = require('../pageobjects/future-rps-land-actions-page');
const PaymentsPage = require('../pageobjects/future-rps-payment-calculation-page');

const pages = {
    login: LoginPage
}

Given(/^(.*) is on the Rural Payments Service (\w+) page$/, async function (farmer, page) {
    await pages[page].open()
    await LoginPage.login()
});

When(/^(.*) is eligible to apply for funding$/, async function (farmer) {
    if (farmer === 'Sarah') {
        await EligibilityPage.chooseSarahsFarm()
    } else if (farmer === 'Jim') {
        await EligibilityPage.chooseJimsFarm()
    }
    await EligibilityPage.selectYesOnMapDetails()
    await EligibilityPage.selectYesOnManagementControlOfLand()
    await EligibilityPage.selectYesOnHEFERConfirmation()
    await EligibilityPage.selectYesOnSSIConsent()
    await EligibilityPage.selectYesOnInheritanceTaxExemption()
    await EligibilityPage.selectYesOnPublicBodies()
    await EligibilityPage.clickContinueButton()
});

When(/^(.*) selects the land parcel type of Arable land$/, async function (farmer) {
    await LandActionsPage.selectArableLandParcel()
});
Then(/^she can choose to apply for SAM1 and or SAM, but not LIG1$/, async function () {
    await LandActionsPage.selectSam1Action()
    await LandActionsPage.enterQuantityForSAM1('8.4')
});
Then(/^Sarah is shown amount she will receive for Arable land$/, async function () {
    await PaymentsPage.validateLandArea(8.4)
    await PaymentsPage.validatePaymentAmount(48.72)
});
When(/^Sarah selects the land parcel type of Permanent Grassland$/, async function () {
    await LandActionsPage.selectPermanentGrasslandParcel()
});
Then(/^she can choose to apply for SAM1 and or LIG1, but not SAM2$/, async function () {
    await LandActionsPage.selectSam1Action()
    await LandActionsPage.enterQuantityForSAM1('4.2')
});
Then(/^Sarah is shown amount she will receive for Permanent Grassland$/, async function () {
    await PaymentsPage.validateLandArea(4.2)
    await PaymentsPage.validatePaymentAmount(24.36)
});
Then(/^he can choose to apply for SAM1, but not SAM2, SAM3 or LIG1$/, async function () {
    await LandActionsPage.selectSam1Action()
    await LandActionsPage.enterQuantityForSAM1('20')
});
Then(/^Jim is shown amount she will receive for Arable land$/, async function () {
    await PaymentsPage.validateLandArea(20)
    await PaymentsPage.validatePaymentAmount(116.00)
});