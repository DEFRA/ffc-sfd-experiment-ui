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
      const userSelectedActions = (request.payload?.selectedActionCodes && Array.isArray(request.payload.selectedActionCodes))
        ? request.payload.selectedActionCodes.map((actionCode) => { return { actionCode, quantity: getActionQuantity(request.payload, actionCode) } })
        : [{ actionCode: request.payload.selectedActionCodes, quantity: getActionQuantity(request.payload, request.payload.selectedActionCodes) }]
      setYarValue(request, ACTION_YAR_KEY, userSelectedActions)
      return h.redirect(nextPath)
    }
  }
]
