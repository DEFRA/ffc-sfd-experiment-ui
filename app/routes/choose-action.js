const Joi = require('joi')
const { urlPrefix } = require('../config/server')
const { getActions, calculateAvailableArea, getLandParcels, validateActions } = require('../services/experiment-api')
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

const getLandUseCodes = (selectedParcel, rawLandParcels) => {
  const parcel = rawLandParcels.find(lp => lp.parcelId === selectedParcel.parcelId)
  return parcel ? parcel.landUseList.map(use => use.CODE) : []
}

const getEnrichedActions = async (rawActions, landUseCodes, selectedParcelArea) => {
  const enrichedActions = []
  for (const action of rawActions) {
    const availableArea = await calculateAvailableArea(action.code, selectedParcelArea, landUseCodes)
    enrichedActions.push({ ...action, availableArea: availableArea.toFixed(4) })
  }
  return enrichedActions
}

const createModel = (actions, selectedActions, errorMessage = '') => {
  const selectedActionQuantities = {}
  selectedActions.forEach((a) => { selectedActionQuantities[a.actionCode] = a.quantity })
  return {
    actions,
    selectedActionQuantities,
    selectedActionCodes: selectedActions.map((a) => a.actionCode),
    errorMessage
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
      const sbi = getYarValue(request, SESSION_KEYS.SELECTED_ORG)
      const selectedParcel = getYarValue(request, SESSION_KEYS.SELECTED_LAND_PARCEL)
      const selectedActions = getYarValue(request, SESSION_KEYS.SELECTED_ACTIONS) ?? []
      const landParcels = await getLandParcels(sbi)

      const landUseCodes = getLandUseCodes(selectedParcel, landParcels)
      const rawActions = await getActions(selectedParcel.parcelId, landUseCodes)
      const enrichedActions = await getEnrichedActions(rawActions, landUseCodes, selectedParcel.area)
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

      const selectedLandParcel = getYarValue(request, SESSION_KEYS.SELECTED_LAND_PARCEL)
      const landUseCodes = getLandUseCodes(selectedLandParcel, getYarValue(request, SESSION_KEYS.RAW_PARCELS))
      const landParcelWithLandUseCodes = { ...selectedLandParcel, landUseCodes }
      const validationResult = await validateActions(userSelectedActions, landParcelWithLandUseCodes)

      if (!validationResult.isValidCombination) {
        const rawActions = await getActions(selectedLandParcel.parcelId, landUseCodes)
        const enrichedActions = await getEnrichedActions(rawActions, landUseCodes, selectedLandParcel.area)
        return h.view(viewTemplate, createModel(enrichedActions, userSelectedActions, validationResult.error)).takeover()
      }
      setYarValue(request, SESSION_KEYS.SELECTED_ACTIONS, userSelectedActions)
      return h.redirect(nextPath)
    }
  }
]
