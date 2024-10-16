const CommonActions = require('../utils/common-actions');

const SELECT_ARABLE_LAND = "//input[@id='selectedLandParcel']"
const SELECT_PERMANENT_GRASSLAND = "//input[@id='selectedLandParcel-2']"
const SELECT_SAM1_ACTION = "//input[@value='SAM1']"
const SELECT_SAM2_ACTION = "//input[@value='SAM2']"
const SELECT_AB3_ACTION = "//input[@value='AB3']"
const SELECT_GRH1_ACTION = "//input[@value='GRH1']"
const SELECT_CSAM1_ACTION = "//input[@value='CSAM1']"
const SELECT_CSAM2_ACTION = "//input[@value='CSAM2']"

const SELECT_CONTINUE = "//button[normalize-space()='Continue']"
const ENTER_QUANTITY_FOR_SAM1 = "//input[@name='quantitySAM1']"
const ENTER_QUANTITY_FOR_SAM2 = "//input[@name='quantitySAM2']"
const ENTER_QUANTITY_FOR_AB3 = "//input[@name='quantityAB3']"
const ENTER_QUANTITY_FOR_GRH1 = "//input[@name='quantityGRH1']"
const ENTER_QUANTITY_FOR_CSAM1 = "//input[@name='quantityCSAM1']"
const ENTER_QUANTITY_FOR_CSAM2 = "//input[@name='quantityCSAM2']"
const LAND_AREA = "tbody tr:nth-child(3) td:nth-child(2)"
const PAYMENT_AMOUNT = "tbody tr:nth-child(3) td:nth-child(3)"
const SELECT_CHECKBOX = "//input[@name='selectedActionCodes']"

const ERROR_MESSAGE = "ul[class='govuk-list govuk-error-summary__list'] li"

class FutureRpsLandActionsPage extends CommonActions {

    async selectLandParcel(landParcelType) {
        const SELECT_LAND_PARCEL = landParcelType === 'Arable' ? SELECT_ARABLE_LAND : SELECT_PERMANENT_GRASSLAND;
        await this.clickOn(SELECT_LAND_PARCEL);
        await this.clickOn(SELECT_CONTINUE);
    }

    async selectAction(actionType) {
        let SELECT_ACTION;
        switch (actionType) {
            case 'SAM1':
                SELECT_ACTION = SELECT_SAM1_ACTION;
                break;
            case 'SAM2':
                SELECT_ACTION = SELECT_SAM2_ACTION;
                break;
            case 'AB3':
                SELECT_ACTION = SELECT_AB3_ACTION;
                break;
            case 'GRH1':
                SELECT_ACTION = SELECT_GRH1_ACTION;
                break;
            case 'CSAM1':
                SELECT_ACTION = SELECT_CSAM1_ACTION;
                break;
            case 'CSAM2':
                SELECT_ACTION = SELECT_CSAM2_ACTION;
                break;
            default:
                throw new Error(`Unknown action type: ${actionType}`);
        }
        await this.clickOn(SELECT_ACTION);
    }

    async enterQuantityForAction(actionType, quantity) {
        let ENTER_QUANTITY;
        switch (actionType) {
            case 'SAM1':
                ENTER_QUANTITY = ENTER_QUANTITY_FOR_SAM1;
                break;
            case 'SAM2':
                ENTER_QUANTITY = ENTER_QUANTITY_FOR_SAM2;
                break;
            case 'AB3':
                ENTER_QUANTITY = ENTER_QUANTITY_FOR_AB3;
                break;
            case 'GRH1':
                ENTER_QUANTITY = ENTER_QUANTITY_FOR_GRH1;
                break;
            case 'CSAM1':
                ENTER_QUANTITY = ENTER_QUANTITY_FOR_CSAM1;
                break;
            case 'CSAM2':
                ENTER_QUANTITY = ENTER_QUANTITY_FOR_CSAM2;
                break;
            default:
                throw new Error(`Unknown action type: ${actionType}`);
        }
        await this.sendKey(ENTER_QUANTITY, quantity);
        await this.clickOn(SELECT_CONTINUE);
    }

    async validateErrorMessage (message) {
        await this.elementToContainText(ERROR_MESSAGE, message)
    }

    async isActionPresent(action) {
        const SELECTED_ACTION = `//input[@value='${action}']`
        return await this.doesElementExist(SELECTED_ACTION)
    }
}

module.exports = new FutureRpsLandActionsPage();