const { urlPrefix } = require('../config/server')
const { getYarValue } = require('../helpers/session')
const viewTemplate = 'payment'
const currentPath = `${urlPrefix}/${viewTemplate}`
const ACTION_YAR_KEY = 'selectedActions'
const RAW_ACTION_YAR_KEY = 'rawActions'
const ACTION_QUANTITY_YAR_KEY = 'quantity'
const DF_SBI = 200599768

const createModel = (paymentAmount, action, actionQuantity) => {
  return {
    paymentAmount,
    action,
    actionQuantity,
    sbi: DF_SBI
  }
}

const getPaymentAmount = async (selectedActions) => {
  if (selectedActions?.length) {
    // eslint-disable-next-line no-undef
    const response = await fetch(`http://ffc-rps-experiment-api:3000/payment?action-code=${selectedActions[0].actionCode}&hectares-applied-for=${selectedActions[0].quantity}`)
    const responseBody = await response.text()
    return responseBody?.length ? JSON.parse(responseBody) : null
  }
  return null
}

module.exports = [
  {
    method: 'GET',
    path: currentPath,
    options: {
      auth: false
    },
    handler: async (request, h) => {
      const selectedActions = getYarValue(request, ACTION_YAR_KEY) ?? []
      const rawActions = getYarValue(request, RAW_ACTION_YAR_KEY) ?? []
      const action = rawActions[0].code + ':' + rawActions[0].description
      const paymentAmount = await getPaymentAmount(selectedActions)
      const actionQuantity = getYarValue(request, ACTION_QUANTITY_YAR_KEY)
      return h.view(viewTemplate, createModel(paymentAmount, action, actionQuantity))
    }
  }
]
