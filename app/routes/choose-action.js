const { urlPrefix } = require('../config/server')
const viewTemplate = 'choose-action'
const currentPath = `${urlPrefix}/${viewTemplate}`

module.exports = [
  {
    method: 'GET',
    path: currentPath,
    options: {
      auth: false
    },
    handler: async (request, h) => {
      // eslint-disable-next-line no-undef
      // const response = await fetch('http://ffc-rps-experiment-api:3000/land-parcel/200599768')
      // const responseBody = await response.text()
      // const rawLandParcels = JSON.parse(responseBody) ?? []
      // const landParcelsViewModel = {
      //   totalLandParcels: rawLandParcels.length,
      //   totalArea: rawLandParcels
      //     .map(lp => parseFloat(lp.area))
      //     .reduce((accumulator, currentValue) => accumulator + currentValue, 0.0)
      //     .toFixed(4),
      //   landParcels: rawLandParcels.map((lp) => {
      //     return {
      //       text: `${lp.osSheetId} ${lp.parcelId} (${parseFloat(lp.area).toFixed(4)} ha)`,
      //       value: lp.parcelId
      //     }
      //   }),
      //   formActionPage: currentPath
      // }
      return h.view(viewTemplate, null)
    }
  }
]
