const { updatePolicy } = require('../cookies')
const Joi = require('joi')
const urlPrefix = require('../config/server').urlPrefix
const viewTemplate = 'cookies/cookie-policy'
const currentPath = `${urlPrefix}/cookies`

function createModel (cookiesPolicy = {}, updated = false) {
  return {
    analytics: {
      idPrefix: 'analytics',
      name: 'analytics',
      classes: 'govuk-radios--inline',
      items: [
        {
          value: true,
          text: 'Yes',
          checked: cookiesPolicy.analytics
        },
        {
          value: false,
          text: 'No',
          checked: !cookiesPolicy.analytics
        }
      ]
    },
    updated
  }
}

module.exports = [{
  method: 'GET',
  path: currentPath,
  options: {
    auth: false
  },
  handler: (request, h) => {
    return h.view(viewTemplate, createModel(request.state.cookies_policy, request.query.updated))
  }
}, {
  method: 'POST',
  path: currentPath,
  options: {
    auth: false,
    validate: {
      payload: Joi.object({
        analytics: Joi.boolean(),
        async: Joi.boolean().default(false)
      })
    },
    handler: async (request, h) => {
      updatePolicy(request, h, request.payload.analytics)
      if (request.payload.async) {
        return h.response('ok')
      }
      return h.redirect(`${currentPath}?updated=true`)
    }
  }
}]
