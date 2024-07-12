const Joi = require('joi')
const { urlPrefix } = require('../config/server')
const { getActions, calculateAvailableArea } = require('../services/experiment-api')
const viewTemplate = 'choose-action'
const currentPath = `${urlPrefix}/${viewTemplate}`
const nextPath = `${urlPrefix}/payment`
const { getYarValue, setYarValue, SESSION_KEYS } = require('../helpers/session')

const getActionQuantity = (requestPayload, selectedActionCode) => {
  return requestPayload[`quantity${selectedActionCode}`]
}

const getActionDescription = (requestPayload, selectedActionCode) => {
  return requestPayload[`actionDesc${selectedActionCode}`]
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

module.exports = [
  {
    method: 'GET',
    path: currentPath,
    options: {
      auth: false
    },
    handler: async (request, h) => {
      const selectedParcel = getYarValue(request, SESSION_KEYS.SELECTED_LAND_PARCEL)
      const selectedActions = getYarValue(request, SESSION_KEYS.SELECTED_ACTIONS) ?? []
      const rawActions = await getActions(selectedParcel.parcelId)
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
            return {
              actionCode,
              quantity: getActionQuantity(request.payload, actionCode),
              description: getActionDescription(request.payload, actionCode)
            }
          })
        : [{
            actionCode: request.payload.selectedActionCodes,
            quantity: getActionQuantity(request.payload, request.payload.selectedActionCodes),
            description: getActionDescription(request.payload, request.payload.selectedActionCodes)
          }]
      setYarValue(request, SESSION_KEYS.SELECTED_ACTIONS, userSelectedActions)
      return h.redirect(nextPath)
    }
  }
]
