const Joi = require('joi')
const { urlPrefix } = require('../config/server')
const viewTemplate = 'choose-land-parcel'
const currentPath = `${urlPrefix}/${viewTemplate}`
const nextPath = `${urlPrefix}/choose-action`
const { setYarValue, getYarValue } = require('../helpers/session')
const LAND_PARCEL_YAR_KEY = 'selectedLandParcelId'
const DF_SBI = 200599768

const createModel = (rawLandParcels, selectedLandParcelId, errMessage) => {
  return {
    totalLandParcels: rawLandParcels.length,
    totalArea: rawLandParcels
      .map(lp => parseFloat(lp.area))
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0.0)
      .toFixed(4),
    landParcels: rawLandParcels.map((lp) => {
      return {
        text: `${lp.osSheetId} ${lp.parcelId} (${parseFloat(lp.area).toFixed(4)} ha)`,
        value: lp.parcelId,
        checked: parseInt(lp.parcelId,10) === selectedLandParcelId
      }
    }),
    errMessage
  }
}

const getErrorMessage = (err) => {
  return 'Please select a land parcel'
}

const getLandParcels = async (sbi) => {
  // eslint-disable-next-line no-undef
  const response = await fetch(`http://ffc-rps-experiment-api:3000/land-parcel/${sbi}`)
  const responseBody = await response.text()
  return JSON.parse(responseBody) ?? []
}

module.exports = [
  {
    method: 'GET',
    path: currentPath,
    options: {
      auth: false
    },
    handler: async (request, h) => {
      const rawLandParcels = await getLandParcels(DF_SBI)
      const selectedLandParcelId = getYarValue(request, LAND_PARCEL_YAR_KEY)
      return h.view(viewTemplate, createModel(rawLandParcels, selectedLandParcelId))
    }
  },
  {
    method: 'POST',
    path: currentPath,
    options: {
      auth: false,
      validate: {
        payload: Joi.object({
          landParcelId: Joi.number().integer().required()
        }),
        failAction: async (request, h, err) => {
          const landParcels = await getLandParcels(DF_SBI)
          return h.view(viewTemplate, createModel(landParcels, undefined, getErrorMessage(err))).takeover()
        }
      }
    },
    handler: async (request, h) => {
      setYarValue(request, LAND_PARCEL_YAR_KEY, request.payload.landParcelId)
      return h.redirect(nextPath)
    }
  }
]
