const CommonActions = require('../utils/common-actions');

const SELECT_PERMANENT_GRASSLAND_ABOVE_MOORLAND = "//input[@id='selectedLandParcel-80']"
const SELECT_PERMANENT_GRASSLAND_BELOW_MOORLAND = "//input[@id='selectedLandParcel-81']"
const SELECT_METALLED_TRACKS = "//input[@id='selectedLandParcel-55']"
const SELECT_RIVERS_STREAMS = "//input[@id='selectedLandParcel-85']"
const SELECT_ARABLE_LAND = "//input[@id='selectedLandParcel-86']"
const SELECT_TINY_PERMANENT_GRASSLAND_BELOW_MOORLAND = "//input[@id='selectedLandParcel']"


const SELECT_SAM1_ACTION = "//input[@value='SAM1']"
const SELECT_SAM2_ACTION = "//input[@value='SAM2']"
const SELECT_AB3_ACTION = "//input[@value='AB3']"
const SELECT_GRH1_ACTION = "//input[@value='GRH1']"
const SELECT_CSAM1_ACTION = "//input[@value='CSAM1']"
const SELECT_CSAM2_ACTION = "//input[@value='CSAM2']"
const SELECT_CSAM3_ACTION = "//input[@value='CSAM3']"
const SELECT_CLIG3_ACTION = "//input[@value='CLIG3']"


const SELECT_CONTINUE = "//button[normalize-space()='Continue']"
const ENTER_QUANTITY_FOR_SAM1 = "//input[@name='quantitySAM1']"
const ENTER_QUANTITY_FOR_SAM2 = "//input[@name='quantitySAM2']"
const ENTER_QUANTITY_FOR_AB3 = "//input[@name='quantityAB3']"
const ENTER_QUANTITY_FOR_GRH1 = "//input[@name='quantityGRH1']"
const ENTER_QUANTITY_FOR_CSAM1 = "//input[@name='quantityCSAM1']"
const ENTER_QUANTITY_FOR_CSAM2 = "//input[@name='quantityCSAM2']"
const ENTER_QUANTITY_FOR_CSAM3 = "//input[@name='quantityCSAM3']"
const ENTER_QUANTITY_FOR_CLIG3 = "//input[@name='quantityCLIG3']"


const LAND_AREA = "tbody tr:nth-child(3) td:nth-child(2)"
const PAYMENT_AMOUNT = "tbody tr:nth-child(3) td:nth-child(3)"
const SELECT_CHECKBOX = "//input[@name='selectedActionCodes']"

const ERROR_MESSAGE = "ul[class='govuk-list govuk-error-summary__list'] li"

class FutureRpsLandActionsPage extends CommonActions {

    async selectLandParcel(landParcelType) {
        let SELECT_LAND_PARCEL;
        switch (landParcelType) {
            case 'Arable':
                SELECT_LAND_PARCEL = SELECT_ARABLE_LAND;
                break;
            case 'Permanent Grassland Above Moorland':
                SELECT_LAND_PARCEL = SELECT_PERMANENT_GRASSLAND_ABOVE_MOORLAND;
                break;
            case 'Permanent Grassland Below Moorland':
                SELECT_LAND_PARCEL = SELECT_PERMANENT_GRASSLAND_BELOW_MOORLAND;
                break;
            case 'Tiny Permanent Grassland Below Moorland':
                SELECT_LAND_PARCEL = SELECT_TINY_PERMANENT_GRASSLAND_BELOW_MOORLAND;
                break;
            case 'Metalled Tracks':
                SELECT_LAND_PARCEL = SELECT_METALLED_TRACKS;
                break;
            case 'Rivers and Streams':
                SELECT_LAND_PARCEL = SELECT_RIVERS_STREAMS;
                break;
            default:
                throw new Error(`Unknown land parcel type: ${landParcelType}`);
        }
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
            case 'CSAM3':
                SELECT_ACTION = SELECT_CSAM3_ACTION;
                break;
            case 'CLIG3':
                SELECT_ACTION = SELECT_CLIG3_ACTION;
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
            case 'CSAM3':
                ENTER_QUANTITY = ENTER_QUANTITY_FOR_CSAM3;
                break;
            case 'CLIG3':
                ENTER_QUANTITY = ENTER_QUANTITY_FOR_CLIG3;
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