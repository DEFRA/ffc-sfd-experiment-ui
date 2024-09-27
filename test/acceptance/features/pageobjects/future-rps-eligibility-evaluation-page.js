const { $ } = require('@wdio/globals')
const CommonActions = require('../utils/common-actions');

const CHOOSE_SARAHS_FARM = "//input[@id='selectedSBI']"
const CHOOSE_JIMS_FARM = "//input[@id='selectedSBI-2']"
const ORGANISATION_CONTINUE_BUTTON = "//button[@id='btn-Continue-SF']"
const MAP_DETAILS = "//input[@id='mapsCorrect']"
const MANAGEMENT_CONTROL_OF_LAND = "//input[@id='managementControl']"
const HEFER_CONFIRMATION = "//input[@id='heferConfirmation']"
const SSI_CONSENT = "//input[@id='sssiConsent']"
const INHERITANCE_TAX_EXEMPTION = "//input[@id='inheritance-tax']"
const PUBLIC_BODIES = "//input[@id='public-bodies']"
const CONTINUE_BUTTON = "//button[@id='Continue']"

class FutureRpsEligibilityEvaluationPage extends CommonActions {

    async chooseSarahsFarm () {
        await this.clickOn(CHOOSE_SARAHS_FARM);
        await this.clickOn(ORGANISATION_CONTINUE_BUTTON);
    }

    async chooseJimsFarm () {
        await this.clickOn(CHOOSE_JIMS_FARM);
        await this.clickOn(ORGANISATION_CONTINUE_BUTTON);
    }

    async selectYesOnMapDetails () {
        await this.clickOn(MAP_DETAILS);
        await this.clickOn(CONTINUE_BUTTON);
    }

    async selectYesOnManagementControlOfLand () {
        await this.clickOn(MANAGEMENT_CONTROL_OF_LAND);
        await this.clickOn(CONTINUE_BUTTON);
    }

    async selectYesOnHEFERConfirmation () {
        await this.clickOn(HEFER_CONFIRMATION);
        await this.clickOn(CONTINUE_BUTTON);
    }

    async selectYesOnSSIConsent () {
        await this.clickOn(SSI_CONSENT);
        await this.clickOn(CONTINUE_BUTTON);
    }

    async selectYesOnInheritanceTaxExemption () {
        await this.clickOn(INHERITANCE_TAX_EXEMPTION);
        await this.clickOn(CONTINUE_BUTTON);
    }

    async selectYesOnPublicBodies () {
        await this.clickOn(PUBLIC_BODIES);
        await this.clickOn(CONTINUE_BUTTON);
    }

    async clickContinueButton () {
        await this.clickOn(CONTINUE_BUTTON);
    }
}

module.exports = new FutureRpsEligibilityEvaluationPage();
