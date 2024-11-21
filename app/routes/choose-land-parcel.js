const Joi = require("joi");
const { getLandParcels } = require("../services/experiment-api");
const { urlPrefix } = require("../config/server");
const viewTemplate = "choose-land-parcel";
const currentPath = `${urlPrefix}/${viewTemplate}`;
const nextPath = `${urlPrefix}/choose-action`;
const {
  setYarValue,
  getYarValue,
  SESSION_KEYS,
} = require("../helpers/session");

const createModel = (rawLandParcels, selectedLandParcel, errMessage) => {
  console.log("rawLandParcels::", JSON.stringify(rawLandParcels));
  return {
    totalLandParcels: rawLandParcels.length,
    totalArea: rawLandParcels
      .map((lp) => parseFloat(lp.area))
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0.0)
      .toFixed(4),
    landParcels: rawLandParcels.map((lp) => {
      return {
        text: `${lp.sheetId} ${lp.id} (${parseFloat(lp.area).toFixed(4)} ha)`,
        hint: listFeatures(lp.features),
        id: `${lp.sheetId}${lp.id}`,
        value: JSON.stringify({
          id: lp.id,
          area: lp.area,
          sheetId: lp.sheetId,
          moorlandLineStatus: lp.attributes.moorlandLineStatus,
          agreements: lp.agreements,
        }),
        checked: lp.parcelId === selectedLandParcel?.parcelId ?? 0,
      };
    }),
    errMessage,
  };
};

const listFeatures = (features) => ({
  text: features.map(
    (feature) => `${feature.landCovers.name}: ${feature.area} ha`
  ),
});

const getErrorMessage = () => {
  return "Please select a land parcel";
};

const getSBI = (request) => {
  return getYarValue(request, SESSION_KEYS.SELECTED_ORG);
};

module.exports = [
  {
    method: "GET",
    path: currentPath,
    options: {
      auth: false,
    },
    handler: async (request, h) => {
      const sbi = getSBI(request);
      const rawLandParcels = await getLandParcels(sbi);
      setYarValue(request, SESSION_KEYS.RAW_PARCELS, rawLandParcels);
      const selectedLandParcel = getYarValue(
        request,
        SESSION_KEYS.SELECTED_LAND_PARCEL
      );
      return h.view(
        viewTemplate,
        createModel(rawLandParcels, selectedLandParcel)
      );
    },
  },
  {
    method: "POST",
    path: currentPath,
    options: {
      auth: false,
      validate: {
        payload: Joi.object({
          selectedLandParcel: Joi.required(),
        }),
        failAction: async (request, h, err) => {
          const sbi = getSBI(request);
          const landParcels = await getLandParcels(sbi);
          return h
            .view(
              viewTemplate,
              createModel(landParcels, undefined, getErrorMessage())
            )
            .takeover();
        },
      },
    },
    handler: async (request, h) => {
      setYarValue(
        request,
        SESSION_KEYS.SELECTED_LAND_PARCEL,
        JSON.parse(request.payload.selectedLandParcel)
      );
      return h.redirect(nextPath);
    },
  },
];
