const { urlPrefix } = require('../config/server')
const { getYarValue } = require('../helpers/session')
const { getPaymentAmount } = require('../services/experiment-api')
const viewTemplate = 'payment'
const currentPath = `${urlPrefix}/${viewTemplate}`
const ACTION_YAR_KEY = 'selectedActions'
const RAW_ACTION_YAR_KEY = 'rawActions'

const createModel = (paymentAmount, action, actionQuantity, sbi) => {
  return {
    paymentAmount: paymentAmount.toFixed(2),
    action,
    actionQuantity,
    sbi
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
      const selectedActions = getYarValue(request, ACTION_YAR_KEY) ?? []
      const rawActions = getYarValue(request, RAW_ACTION_YAR_KEY) ?? []
      const sbi = getYarValue(request, 'chosen-organisation')
      const action = rawActions[0].code + ': ' + rawActions[0].description
      const paymentAmount = await getPaymentAmount(selectedActions)
      const actionQuantity = selectedActions[0].quantity
      return h.view(viewTemplate, createModel(paymentAmount, action, actionQuantity, sbi))
    }
  }
]
