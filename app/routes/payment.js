const { urlPrefix } = require("../config/server");
const {
  getYarValue,
  SESSION_KEYS,
  setYarValue,
} = require("../helpers/session");
const {
  calculatePaymentAmount,
  submitFundingApplication,
  getLandParcels,
} = require("../services/experiment-api");
const viewTemplate = "payment";
const currentPath = `${urlPrefix}/${viewTemplate}`;
const nextPath = `${urlPrefix}/application-confirmation`;

const createModel = (selectedActions, actionPaymentsResponse, sbi) => {
  let model;

  if (!actionPaymentsResponse.error) {
    model = {
      payments: selectedActions.map((selectedAction, index) => {
        const actionPayment = actionPaymentsResponse.find(
          (p) => p["action-code"] === selectedAction.actionCode
        );

        return {
          paymentAmount: actionPayment ? actionPayment.payment.toFixed(2) : 0.0,
          action: selectedAction.actionCode + ": " + selectedAction.description,
          quantity: selectedAction.quantity,
        };
      }),
      sbi,
    };
  } else {
    model = {
      error: actionPaymentsResponse,
    };
  }
  return model;
};

const getLandUseCodesOfSeletedLandParcel = (parcelId, landParcelsList) => {
  const matchingParcel = landParcelsList.find(
    (parcel) => parcel.parcelId === parcelId
  );
  if (matchingParcel && matchingParcel.landUseList) {
    return matchingParcel.landUseList.map((use) => use.code);
  }
  return [];
};

const createFundingApplication = (request) => {
  const applicantName = getYarValue(request, SESSION_KEYS.APPLICANT_NAME);
  const sbi = getYarValue(request, SESSION_KEYS.SELECTED_ORG);
  const scheme = "SFI 2023";
  const selectedLandParcel = getYarValue(
    request,
    SESSION_KEYS.SELECTED_LAND_PARCEL
  );
  const landParcelRef = `${selectedLandParcel.osSheetId} ${selectedLandParcel.parcelId}`;
  const landActions = getYarValue(request, SESSION_KEYS.SELECTED_ACTIONS);
  const paymentAmounts = getYarValue(request, SESSION_KEYS.PAYMENT_AMOUNT);
  return {
    applicantName,
    sbi,
    landParcelRef,
    landActions,
    paymentAmount: paymentAmounts
      .map((pa) => pa.payment)
      .reduce((accumulator, payment) => accumulator + payment),
    scheme,
  };
};

module.exports = [
  {
    method: "GET",
    path: currentPath,
    options: {
      auth: false,
    },
    handler: async (request, h) => {
      const sbi = getYarValue(request, SESSION_KEYS.SELECTED_ORG);
      const selectedActions =
        getYarValue(request, SESSION_KEYS.SELECTED_ACTIONS) ?? [];
      const selectedLandParcel = getYarValue(
        request,
        SESSION_KEYS.SELECTED_LAND_PARCEL
      );
      const allLandParcels = await getLandParcels(sbi);
      const landUseCodes = getLandUseCodesOfSeletedLandParcel(
        selectedLandParcel.parcelId,
        allLandParcels
      );
      const actionPaymentsResponse = await calculatePaymentAmount(
        selectedActions,
        landUseCodes
      );

      setYarValue(request, SESSION_KEYS.PAYMENT_AMOUNT, actionPaymentsResponse);

      return h.view(
        viewTemplate,
        createModel(selectedActions, actionPaymentsResponse, sbi)
      );
    },
  },
  {
    method: "POST",
    path: currentPath,
    options: {
      auth: false,
    },
    handler: async (request, h) => {
      const fundingApplication = createFundingApplication(request);
      const response = await submitFundingApplication(fundingApplication);
      if (response) {
        setYarValue(request, SESSION_KEYS.APPLICATION_REF, response.id);
      }
      return h.redirect(nextPath);
    },
  },
];
