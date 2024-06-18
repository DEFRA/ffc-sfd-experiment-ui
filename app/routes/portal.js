const { urlPrefix } = require('../config/server')
const viewTemplate = 'portal'
const currentPath = `${urlPrefix}/${viewTemplate}`
const { setYarValue, getYarValue } = require('../helpers/session')
const { getActions, getGrants } = require('../messaging/application')
const { drawSectionGetRequests, drawSectionPostRequests } = require('../routes')
const grantStatus = {
  available: {
    text: 'Not started',
    classes: 'govuk-tag--blue'
  },
  submitted: {
    text: 'Submitted',
    classes: 'govuk-tag--light-blue'
  },
  'under-review': {
    text: 'Under review',
    classes: 'govuk-tag--light-blue'
  },
  successful: {
    text: 'Successful',
    classes: 'govuk-tag--green'
  },
  unsuccessful: {
    text: 'Unsuccessful',
    classes: 'govuk-tag--red'
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
      // GET the available grants information and save it in a yarKey
      const chosenFarm = getYarValue(request, 'chosen-organisation')
      const farmerData = getYarValue(request, 'account-information')
      // const chosenFarmObject = farmerData.companies.find(
      //   company => company.id === chosenFarm
      // )
      // const userData = { userID: farmerData.crn, sbi: chosenFarmObject.sbi }
      try {
        console.log('Sending session message .....')
        const result = await getActions()

        console.log(result, '[Available actions]')
        request.yar.set('available-actions', result)
      } catch (error) {
        console.log(error)
        return h.view('500').takeover()
      }
      const availableGrants = getYarValue(request, 'available-actions')

      // Format the grant status to be displayed properly
      availableGrants.forEach(grant => {
        grant.tagDisplay = grantStatus[grant.status]
      })
      return h.view(viewTemplate, {
        formActionPage: currentPath,
        backUrl: `${urlPrefix}/choose-organisation`,
        farmerData,
        chosenFarm: farmerData.companies.find(
          company => company.id === chosenFarm
        ),
        availableGrants
      })
    }
  },
  {
    method: 'POST',
    path: currentPath,
    options: {
      auth: false
    },
    handler: async (request, h) => {
      const grantID = request.payload.grantId
      let questionBankData
      // questionBankData = equipmentGrant
      // GET the requested grant questions
      try {
        console.log('Sending session message .....')
        questionBankData = await getGrants(
          request.yar.id,
          getYarValue(request, 'msgQueueSuffix'),
          null,
          grantID
        )
        console.log(
          JSON.stringify(questionBankData.themes[0].questions),
          '[QUESTIONS WE GOT BACK]'
        )
      } catch (error) {
        console.log(error)
        return h.view('500').takeover()
      }

      setYarValue(request, 'grant-information', questionBankData)
      const allQuestions = []
      questionBankData.themes.forEach(({ questions }) => {
        allQuestions.push(...questions)
      })
      // Saves all of the questions in a yar key as too many integral functions require the ALL_QUESTIONS property
      setYarValue(request, 'grant-questions', allQuestions)
      // Generate the new routes
      const pages = questionBankData.themes
        .map(section => drawSectionGetRequests(section, grantID))[0]
        .concat(
          questionBankData.themes.map(section =>
            drawSectionPostRequests(section, grantID)
          )[0]
        )
      // Access server and register the new routes
      try {
        request.server.route(pages)
      } catch (err) {
        console.log('Failed to add routes, they potentially already exist')
      }
      const startUrl = questionBankData.themes[0].questions.find(
        theme => theme.journeyStart
      ).url
      return h.redirect(`${urlPrefix}/${grantID}/${startUrl}`)
    }
  }
]
