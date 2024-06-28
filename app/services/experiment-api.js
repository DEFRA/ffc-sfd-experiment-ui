const { experimentApiBaseUrl } = require('../config/server')

const invokeGetEndpoint = async (url, defaultReturnValue) => {
  // eslint-disable-next-line no-undef
  const response = await fetch(url)
  const deserialisedResponseBody = await response.json()
  return deserialisedResponseBody ?? defaultReturnValue
}

const getLandParcels = async (sbi) => {
  return invokeGetEndpoint(`${experimentApiBaseUrl}/land-parcel/${sbi}`, [])
}

const getActions = async (selectedLandParcelId) => {
  return invokeGetEndpoint(`${experimentApiBaseUrl}/action?parcel-id=${selectedLandParcelId}`, [])
}

const calculateAvailableArea = async (actionCode, landParcelArea) => {
  // eslint-disable-next-line no-undef
  const response = await fetch(
    `${experimentApiBaseUrl}/available-area`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ applicationFor: actionCode, landParcel: { area: landParcelArea } })
    })
  const deserializedResponse = await response.json()
  return deserializedResponse ?? null
}

const getPaymentAmount = async (selectedActions) => {
  if (selectedActions?.length) {
    return invokeGetEndpoint(`${experimentApiBaseUrl}/payment?action-code=${selectedActions[0].actionCode}&hectares-applied-for=${selectedActions[0].quantity}`, null)
  }
  return null
}

module.exports = {
  getLandParcels,
  getActions,
  calculateAvailableArea,
  getPaymentAmount
}
