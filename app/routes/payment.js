const { urlPrefix } = require('../config/server')
const { getYarValue, SESSION_KEYS, setYarValue } = require('../helpers/session')
const { getPaymentAmount, submitFundingApplication } = require('../services/experiment-api')
const viewTemplate = 'payment'
const currentPath = `${urlPrefix}/${viewTemplate}`
const nextPath = `${urlPrefix}/application-confirmation`

const createModel = (request, paymentAmount, selectedActions) => {
  const sbi = getYarValue(request, SESSION_KEYS.SELECTED_ORG)
  const action = selectedActions[0].actionCode + ': ' + selectedActions[0].description
  const actionQuantity = selectedActions[0].quantity
  return {
    paymentAmount: paymentAmount.toFixed(2),
    action,
    actionQuantity,
    sbi
  }
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
      const selectedActions = getYarValue(request, SESSION_KEYS.SELECTED_ACTIONS) ?? []
      const paymentAmount = await getPaymentAmount(selectedActions)
      setYarValue(request, SESSION_KEYS.PAYMENT_AMOUNT, paymentAmount)
      return h.view(viewTemplate, createModel(request, paymentAmount, selectedActions))
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
