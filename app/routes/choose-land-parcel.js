const Joi = require('joi')
const { getLandParcels } = require('../services/experiment-api')
const { urlPrefix } = require('../config/server')
const viewTemplate = 'choose-land-parcel'
const currentPath = `${urlPrefix}/${viewTemplate}`
const nextPath = `${urlPrefix}/choose-action`
const { setYarValue, getYarValue, SESSION_KEYS } = require('../helpers/session')

const createModel = (rawLandParcels, selectedLandParcel, errMessage) => {
  return {
    totalLandParcels: rawLandParcels.length,
    totalArea: rawLandParcels
      .map(lp => parseFloat(lp.area))
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0.0)
      .toFixed(4),
    landParcels: rawLandParcels.map((lp) => {
      return {
        text: `${lp.osSheetId} ${lp.parcelId} (${parseFloat(lp.area).toFixed(4)} ha)`,
        value: JSON.stringify({ parcelId: lp.parcelId, area: lp.area, osSheetId: lp.osSheetId }),
        checked: lp.parcelId === selectedLandParcel?.parcelId ?? 0
      }
    }),
    errMessage
  }
}

const getErrorMessage = () => {
  return 'Please select a land parcel'
}

const getSBI = (request) => {
  return getYarValue(request, SESSION_KEYS.SELECTED_ORG)
}

module.exports = [
  {
    method: 'GET',
    path: currentPath,
    options: {
      auth: false
    },
    handler: async (request, h) => {
      const sbi = getSBI(request)
      const rawLandParcels = await getLandParcels(sbi)
      const selectedLandParcel = getYarValue(request, SESSION_KEYS.SELECTED_LAND_PARCEL)
      return h.view(viewTemplate, createModel(rawLandParcels, selectedLandParcel))
    }
  },
  {
    method: 'POST',
    path: currentPath,
    options: {
      auth: false,
      validate: {
        payload: Joi.object({
          selectedLandParcel: Joi.required()
        }),
        failAction: async (request, h, err) => {
          const sbi = getSBI(request)
          const landParcels = await getLandParcels(sbi)
          return h.view(viewTemplate, createModel(landParcels, undefined, getErrorMessage())).takeover()
        }
      }
    },
    handler: async (request, h) => {
      setYarValue(request, SESSION_KEYS.SELECTED_LAND_PARCEL, JSON.parse(request.payload.selectedLandParcel))
      return h.redirect(nextPath)
    }
  }
]
