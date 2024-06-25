const { urlPrefix } = require('../config/server')
const viewTemplate = 'choose-action'
const currentPath = `${urlPrefix}/${viewTemplate}`
const nextPath = `${urlPrefix}/payment`
const { getYarValue, setYarValue } = require('../helpers/session')
const ACTION_YAR_KEY = 'selectedActions'
const ACTION_QUANTITY_YAR_KEY = 'quantity'

const getActionQuantity = (requestPayload, selectedActionCode) => {
  return requestPayload[`quantity${selectedActionCode}`]
}

const createModel = (actions, selectedActions) => {
  return {
    actions,
    selectedActions
  }
}

const getActions = async (selectedLandParcelId) => {
  // eslint-disable-next-line no-undef
  const response = await fetch(`http://ffc-rps-experiment-api:3000/action?parcel-id=${selectedLandParcelId}`)
  const responseBody = await response.text()
  return responseBody?.length ? JSON.parse(responseBody) : []
}

module.exports = [
  {
    method: 'GET',
    path: currentPath,
    options: {
      auth: false
    },
    handler: async (request, h) => {
      const selectedParcelId = getYarValue(request, 'selectedLandParcelId')
      const selectedActions = getYarValue(request, ACTION_YAR_KEY) ?? []
      const rawActions = await getActions(selectedParcelId)
      setYarValue(request, 'rawActions', rawActions)
      return h.view(viewTemplate, createModel(rawActions, selectedActions))
    }
  },
  {
    method: 'POST',
    path: currentPath,
    options: {
      auth: false
    },
    handler: async (request, h) => {
      const actionQuantity = getActionQuantity(request.payload, request.payload.selectedActionCodes)
      const userSelectedActions = (request.payload?.selectedActionCodes && Array.isArray(request.payload.selectedActionCodes))
        ? request.payload.selectedActionCodes.map((actionCode) => { return { actionCode, quantity: getActionQuantity(request.payload, actionCode) } })
        : [{ actionCode: request.payload.selectedActionCodes, quantity: actionQuantity }]
      setYarValue(request, ACTION_YAR_KEY, userSelectedActions)
      setYarValue(request, ACTION_QUANTITY_YAR_KEY, actionQuantity)
      return h.redirect(nextPath)
    }
  }
]
