const { urlPrefix } = require('../config/server')
const viewTemplate = 'login'
const currentPath = `${urlPrefix}/${viewTemplate}`
const nextPath = `${urlPrefix}/choose-organisation`
const { accountInformation } = require('../config/account-information')
const { setYarValue } = require('../helpers/session')

function createModel (errorMessage) {
  return {
    formActionPage: currentPath,
    usernameInput: {
      label: {
        text: 'Customer reference number (CRN)'
      },
      classes: 'govuk-input--width-10',
      id: 'username',
      name: 'username'
    },
    passwordInput: {
      label: {
        text: 'Password'
      },
      classes: 'govuk-input--width-10',
      id: 'password',
      name: 'password',
      type: 'password'
    },
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
    handler: (request, h) => {
      request.yar.reset()
      return h.view(viewTemplate, createModel(null))
    }
  },
  {
    method: 'POST',
    path: currentPath,
    options: {
      auth: false,
    },
    handler: (request, h) => {
      const farmerData = accountInformation[request.payload.username]
      setYarValue(request, 'account-information', farmerData)
      return h.redirect(nextPath)
    }
  }
]
