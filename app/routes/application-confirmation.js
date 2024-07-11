const { urlPrefix } = require('../config/server')
const { getYarValue, SESSION_KEYS } = require('../helpers/session')
const viewTemplate = 'application-confirmation'
const currentPath = `${urlPrefix}/${viewTemplate}`

const createModel = (request) => {
  const applicationRef = getYarValue(request, SESSION_KEYS.APPLICATION_REF)
  return { applicationRef }
}

module.exports = [{
  method: 'GET',
  path: currentPath,
  options: {
    auth: false
  },
  handler: (request, h) => {
    return h.view(viewTemplate, createModel(request))
  }
}]
