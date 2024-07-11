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

const getLandParcels = async (sbi) => {
  return invokeGetEndpoint(`land-parcel/${sbi}`, [])
}

const getActions = async (selectedLandParcelId) => {
  return invokeGetEndpoint(`action?parcel-id=${selectedLandParcelId}`, [])
}

const calculateAvailableArea = async (actionCode, landParcelArea) => {
  // eslint-disable-next-line no-undef
  return invokePostEndpoint('available-area', { applicationFor: actionCode, landParcel: { area: landParcelArea } })
}

const getPaymentAmount = async (selectedActions) => {
  if (selectedActions?.length) {
    return invokeGetEndpoint(`payment?action-code=${selectedActions[0].actionCode}&hectares-applied-for=${selectedActions[0].quantity}`, null)
  }
  return null
}

const submitFundingApplication = async (fundingApplication) => {
  return invokePostEndpoint('funding-application', fundingApplication)
}

module.exports = {
  getLandParcels,
  getActions,
  calculateAvailableArea,
  getPaymentAmount,
  submitFundingApplication
}
