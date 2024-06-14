const { urlPrefix } = require('../config/server')
const viewTemplate = 'choose-organisation'
const currentPath = `${urlPrefix}/${viewTemplate}`
const nextPath = `${urlPrefix}/portal`
const { getYarValue, setYarValue } = require('../helpers/session')

function createModel (farmerData) {
  const model = {
    formActionPage: currentPath,
    radioInput: {
      name: "chooseOrganisation",
      fieldset: {
        legend: {
          text: "Choose organisation",
          isPageHeading: true,
          classes: "govuk-fieldset__legend--l"
        }
      },
      items: [],
      id: "chooseOrganisation"
    },
    headerData: {
      firstName: farmerData.firstName,
      lastName: farmerData.lastName
    }
  }
  farmerData.companies.forEach((company) => {
    model.radioInput.items.push({
      text: company.name,
      value: company.id
    })
  })
  return model
}

module.exports = [
  {
    method: 'GET',
    path: currentPath,
    options: {
      auth: false
    },
    handler: (request, h) => {
      const farmerData = getYarValue(request, 'account-information')
      return h.view(viewTemplate, createModel(farmerData))
    }
  },
  {
    method: 'POST',
    path: currentPath,
    options: {
      auth: false,
    },
    handler: (request, h) => {
      if (!request.payload.chooseOrganisation) {
        const farmerData = getYarValue(request, 'account-information')
        const currentModel = createModel(farmerData)
        return h.view(viewTemplate, {
          ...currentModel,
          errorList: [
            {
              text: 'Please select an organisation',
              href: `#chooseOrganisation`
            }
          ]
        } )
      }
      console.log(request.payload, 'LLLLLLLLLLLL')
      setYarValue(request, 'msgQueueSuffix', request.payload.queueSuffix)
      setYarValue(request, 'chosen-organisation', request.payload.chooseOrganisation)
      return h.redirect(nextPath)
    }
  }
]
