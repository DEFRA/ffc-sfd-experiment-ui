const { urlPrefix } = require('../config/server')
const viewTemplate = 'choose-action'
const currentPath = `${urlPrefix}/${viewTemplate}`
const nextPath = `${urlPrefix}/payment`
const { getYarValue, setYarValue } = require('../helpers/session')
const ACTION_YAR_KEY = 'selectedActions'

const getActionQuantity = (requestPayload, selectedActionCode) => {
  return requestPayload[`quantity${selectedActionCode}`]
}

const createModel = (actions, selectedActions) => {
  const selectedActionQuantities = {}
  selectedActions.forEach((a) => { selectedActionQuantities[a.actionCode] = a.quantity })
  return {
    actions,
    selectedActionQuantities,
    selectedActionCodes: selectedActions.map((a) => a.actionCode)
  }
}

const getActions = async (selectedLandParcelId) => {
  // eslint-disable-next-line no-undef
  const response = await fetch(`http://ffc-rps-experiment-api:3000/action?parcel-id=${selectedLandParcelId}`)
  const responseBody = await response.text()
  return responseBody?.length ? JSON.parse(responseBody) : []
}

const calculateAvailableArea = async (actionCode, landParcelArea) => {
  // eslint-disable-next-line no-undef
  const response = await fetch(
    'http://ffc-rps-experiment-api:3000/available-area',
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

module.exports = [
  {
    method: 'GET',
    path: currentPath,
    options: {
      auth: false
    },
    handler: async (request, h) => {
      const selectedParcel = getYarValue(request, 'selectedLandParcel')
      const selectedActions = getYarValue(request, ACTION_YAR_KEY) ?? []
      const rawActions = await getActions(selectedParcel.parcelId)
      setYarValue(request, 'rawActions', rawActions)
      const enrichedActions = []
      for (const action of rawActions) {
        const availableArea = await calculateAvailableArea(action.code, selectedParcel.area)
        enrichedActions.push({ ...action, availableArea: availableArea.toFixed(4) })
      }
      return h.view(viewTemplate, createModel(enrichedActions, selectedActions))
    }
  },
  {
    method: 'POST',
    path: currentPath,
    options: {
      auth: false
    },
    handler: async (request, h) => {
      const userSelectedActions = (request.payload?.selectedActionCodes && Array.isArray(request.payload.selectedActionCodes))
        ? request.payload.selectedActionCodes.map((actionCode) => {
            return { actionCode, quantity: getActionQuantity(request.payload, actionCode) }
          })
        : [{
            actionCode: request.payload.selectedActionCodes,
            quantity: getActionQuantity(request.payload, request.payload.selectedActionCodes)
          }]
      setYarValue(request, ACTION_YAR_KEY, userSelectedActions)
      return h.redirect(nextPath)
    }
  }
]
