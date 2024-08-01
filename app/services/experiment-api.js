const { experimentApiBaseUrl } = require('../config/server')

const invokeGetEndpoint = async (endpoint, defaultReturnValue) => {
  // eslint-disable-next-line no-undef
  const response = await fetch(`${experimentApiBaseUrl}/${endpoint}`)
  const deserialisedResponseBody = await response.json()
  return deserialisedResponseBody ?? defaultReturnValue
}

const invokePostEndpoint = async (endpoint, requestPayload) => {
  // eslint-disable-next-line no-undef
  const response = await fetch(
        `${experimentApiBaseUrl}/${endpoint}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestPayload)
        })
  const deserializedResponse = await response.json()
  return deserializedResponse ?? null
}

const validateActions = async (actions, landParcel) => {
  return invokePostEndpoint('action-validation', { actions, landParcel })
}

const getLandParcels = async (sbi) => {
  return invokeGetEndpoint(`land-parcel/${sbi}`, [])
}

const getActions = async (selectedLandParcelId, landUseCodes, preexistingActions) => {
  const landUseCodesString = landUseCodes.join(',')
  return invokeGetEndpoint(`action?parcel-id=${selectedLandParcelId}&land-use-codes=${encodeURIComponent(landUseCodesString)}&preexisting-actions=${preexistingActions}`, [])
}

const calculateAvailableArea = async (actionCode, landParcelArea, landUseCodes) => {
  return invokePostEndpoint('available-area', {
    applicationFor: actionCode,
    landParcel: { area: landParcelArea },
    landUseCodes
  })
}

const calculatePaymentAmount = async (selectedActions, landUseCodes) => {
  if (selectedActions?.length) {
    const payload = {
      actions: selectedActions.map(action => ({
        'action-code': action.actionCode,
        'hectares-applied-for': parseFloat(action.quantity)
      })),
      'land-use-codes': landUseCodes
    }
    return invokePostEndpoint('payment-calculation', payload)
  }
  return []
}

const submitFundingApplication = async (fundingApplication) => {
  return invokePostEndpoint('funding-application', fundingApplication)
}

module.exports = {
  getLandParcels,
  getActions,
  calculateAvailableArea,
  calculatePaymentAmount,
  submitFundingApplication,
  validateActions
}
