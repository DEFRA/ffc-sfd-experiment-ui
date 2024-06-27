const Joi = require('joi')
const { urlPrefix } = require('../config/server')
const { getActions, calculateAvailableArea } = require('../services/experiment-api')
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
