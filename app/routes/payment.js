const { urlPrefix } = require('../config/server')
const { getYarValue, SESSION_KEYS, setYarValue } = require('../helpers/session')
const { getPaymentAmount, submitFundingApplication, getLandParcels } = require('../services/experiment-api')
const viewTemplate = 'payment'
const currentPath = `${urlPrefix}/${viewTemplate}`
const nextPath = `${urlPrefix}/application-confirmation`

const createModel = (selectedActions, actionPayments, sbi) => {
    const model = {
        payments: selectedActions.map((selectedAction, index) => {
            const actionPayment = actionPayments.find(p => p['action-code'] === selectedAction.actionCode)

            return {
                paymentAmount: actionPayment ? actionPayment.payment.toFixed(2) : 0.00,
                action: selectedAction.actionCode + ': ' + selectedAction.description,
                quantity: selectedAction.quantity
            }
        }),
        sbi
    }
    console.log('model::', model)
    return model
}

const getLandUseCodesOfSeletedLandParcel = (parcelId, landParcelsList) => {
    const matchingParcel = landParcelsList.find(parcel => parcel.parcelId === parcelId);
    if (matchingParcel && matchingParcel.landUseList) {
        return matchingParcel.landUseList.map(use => use.code);
    }
    return [];
}

const createFundingApplication = (request) => {
  const applicantName = getYarValue(request, SESSION_KEYS.APPLICANT_NAME)
  const sbi = getYarValue(request, SESSION_KEYS.SELECTED_ORG)
  const selectedLandParcel = getYarValue(request, SESSION_KEYS.SELECTED_LAND_PARCEL)
  const landParcelRef = `${selectedLandParcel.osSheetId} ${selectedLandParcel.parcelId}`
  const landActions = getYarValue(request, SESSION_KEYS.SELECTED_ACTIONS)
  const paymentAmount = getYarValue(request, SESSION_KEYS.PAYMENT_AMOUNT)
  return {
    applicantName,
    sbi,
    landParcelRef,
    landActions,
    paymentAmount
  }
}

module.exports = [
  {
    method: 'GET',
    path: currentPath,
    options: {
      auth: false
    },
      handler: async (request, h) => {
          const sbi = getYarValue(request, SESSION_KEYS.SELECTED_ORG)
          const selectedActions = getYarValue(request, SESSION_KEYS.SELECTED_ACTIONS) ?? []
          const selectedLandParcel = getYarValue(request, SESSION_KEYS.SELECTED_LAND_PARCEL)
          const allLandParcels = await getLandParcels(sbi)
          const landUseCodes = getLandUseCodesOfSeletedLandParcel(selectedLandParcel.parcelId, allLandParcels);
          const actionPayments = await getPaymentAmount(selectedActions, landUseCodes)
          setYarValue(request, SESSION_KEYS.PAYMENT_AMOUNT, actionPayments)

          return h.view(viewTemplate, createModel(selectedActions, actionPayments, sbi))
      }
  },
  {
    method: 'POST',
    path: currentPath,
    options: {
      auth: false
    },
    handler: async (request, h) => {
      const fundingApplication = createFundingApplication(request)
      const response = await submitFundingApplication(fundingApplication)
      if (response) {
        setYarValue(request, SESSION_KEYS.APPLICATION_REF, response.id)
      }
      return h.redirect(nextPath)
    }
  }
]
