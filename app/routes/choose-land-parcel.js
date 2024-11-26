const Joi = require('joi')
const { getLandParcels } = require('../services/experiment-api')
const { urlPrefix } = require('../config/server')
const viewTemplate = 'choose-land-parcel'
const currentPath = `${urlPrefix}/${viewTemplate}`
const nextPath = `${urlPrefix}/choose-action`
const { setYarValue, getYarValue, SESSION_KEYS } = require('../helpers/session')


function transformFeature(feature, parcelId, index, sbi, sheetId, attributes) {
  return {
    index: index,
    parcelId: parcelId,
    areaHa: parseFloat(feature.area).toFixed(4),
    sbi: sbi.toString(),
    sheetId: sheetId,
    landCovers: [
      {
        type: feature.landCovers?.name?.toUpperCase() || "UNKNOWN",
        coverArea: parseFloat(feature.area).toFixed(4),
      },
    ],
    agreements: [], // Add agreements here if applicable
    landUses: feature.landUseList?.map((landUse) => ({
      name: landUse.name?.toUpperCase() || "UNKNOWN",
      code: landUse.code || "",
      area: parseFloat(feature.area).toFixed(4),
      cropPlan: feature.landCovers?.name?.toUpperCase() || "UNKNOWN",
    })) || [],
    attributes: {
      moorlandLineStatus: attributes?.moorlandLineStatus || "",
    },
  };
}

function transformLandParcels(data) {
  if (!data || !Array.isArray(data)) {
    console.error('Invalid input data:', data);
    return [];
  }

  const transformed = [];
  let index = 2067679; // Starting index, can be adjusted as needed

  for (const parcel of data) {
    if (!parcel) {
      console.warn('Skipping null parcel');
      continue;
    }

    const { id: parcelId, sbi, sheetId, attributes, features } = parcel;

    if (!features || features.length === 0) {
      console.warn('Parcel has no features:', parcelId);
      continue;
    }

    for (const feature of features) {
      transformed.push(
        transformFeature(
          feature,
          parcelId,
          index++,
          sbi,
          sheetId,
          attributes
        )
      );
    }
  }

  return transformed;
}

const createModel = (rawLandParcels, selectedLandParcel, errMessage) => {
  console.log('rawLandParcels::', JSON.stringify(rawLandParcels));
  console.log('selectedLandParcel::', JSON.stringify(selectedLandParcel));
  rawLandParcels = transformLandParcels(rawLandParcels);

  return {
    totalLandParcels: rawLandParcels.length,
    totalArea: rawLandParcels
      .map(lp => parseFloat(lp.areaHa))
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0.0)
      .toFixed(4),
    landParcels: rawLandParcels.map((lp) => {
      const landUseDescriptions = lp.landUses.map(use => use.name).join(', ');
      const landUseArea = lp.landUses.map(use => use.area).join(', ');
      return {
        text: `${lp.sheetId} ${lp.parcelId} (${parseFloat(lp.areaHa).toFixed(4)} ha)`,
        hint: { text: `Land use: ${landUseDescriptions}: ${landUseArea} ha` },
        value: JSON.stringify({
          parcelId: lp.parcelId,
          area: lp.areaHa,
          osSheetId: lp.sheetId,
          landUses: lp.landUses,
          moorlandLineStatus: lp.attributes.moorlandLineStatus,
          agreements: lp.agreements
        }),
        checked: lp.parcelId === (selectedLandParcel?.parcelId ?? 0)
      };
    }),
    errMessage
  };
};

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
      setYarValue(request, SESSION_KEYS.RAW_PARCELS, rawLandParcels)
      const selectedLandParcel = getYarValue(request, SESSION_KEYS.SELECTED_LAND_PARCEL)
      console.log('selectedLandParcel::', JSON.stringify(selectedLandParcel))
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
      console.log('HERE::',JSON.stringify(request.payload.selectedLandParcel))
      setYarValue(request, SESSION_KEYS.SELECTED_LAND_PARCEL, JSON.parse(request.payload.selectedLandParcel))
      return h.redirect(nextPath)
    }
  }
]
