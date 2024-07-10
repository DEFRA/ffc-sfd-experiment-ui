const Joi = require('joi')
const { urlPrefix } = require('../config/server')
const { getActions, calculateAvailableArea, getLandParcels, validateActions} = require('../services/experiment-api')
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

const createModel = (actions, selectedActions, errorMessage= '') => {
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
      // const rawLandParcels = getYarValue(request, 'rawLandParcels')
      const landParcels = await getLandParcels(sbi)


      const landUseCodes = getLandUseCodes(selectedParcel, landParcels)
      const rawActions = await getActions(selectedParcel.parcelId, landUseCodes)
      // setYarValue(request, 'rawActions', rawActions)
      const enrichedActions = []
      for (const action of rawActions) {
        const availableArea = await calculateAvailableArea(action.code, selectedParcel.area, landUseCodes)

        enrichedActions.push({...action, availableArea: availableArea.toFixed(4)})


      }
      console.log('enrichedActions::::', enrichedActions)
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

      const landUseCodes = getLandUseCodes(getYarValue(request, SESSION_KEYS.SELECTED_LAND_PARCEL), getYarValue(request, SESSION_KEYS.RAW_PARCELS))
      const actionCodes = userSelectedActions.map(action => action.actionCode);
      const validationResult = await validateActions(actionCodes, landUseCodes)

      if (validationResult.isValidCombination === false) {
        const rawActions = await getActions(getYarValue(request, SESSION_KEYS.SELECTED_LAND_PARCEL).parcelId, landUseCodes);
        return h.view(viewTemplate, createModel(rawActions, userSelectedActions, 'Please choose a valid combination of actions')).takeover();
      }
      setYarValue(request, SESSION_KEYS.SELECTED_ACTIONS, userSelectedActions)
      return h.redirect(nextPath)
    }
  }
]
