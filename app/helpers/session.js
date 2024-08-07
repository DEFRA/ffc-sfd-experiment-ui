function setYarValue (request, key, value) {
  request.yar.set(key, value)
}

function getYarValue (request, key) {
  if (request.yar) {
    return request.yar.get(key)
  }
  return null
}

function clearYarValue (request, key) {
  request.yar.clear(key)
}

const SESSION_KEYS = {
  SELECTED_LAND_PARCEL: 'selectedLandParcel',
  SELECTED_ACTIONS: 'selectedActions',
  SELECTED_ORG: 'chosen-organisation',
  APPLICANT_NAME: 'applicantName',
  PAYMENT_AMOUNT: 'paymentAmount',
  APPLICATION_REF: 'applicationReference',
  RAW_PARCELS: 'rawLandParcels',
  SELECTED_FARM_NAME: 'selectedFarmName'
}

module.exports = {
  setYarValue,
  getYarValue,
  clearYarValue,
  SESSION_KEYS
}
