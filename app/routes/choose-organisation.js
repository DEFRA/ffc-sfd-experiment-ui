const {urlPrefix} = require('../config/server')
const viewTemplate = 'choose-organisation'
const currentPath = `${urlPrefix}/${viewTemplate}`
const {setYarValue, getYarValue} = require('../helpers/session')
const {questionBank} = require('../config/question-bank')
const {drawSectionGetRequests, drawSectionPostRequests} = require('./index')

global.addedGrantIDs = global.addedGrantIDs || [];

function createModel() {
    const model = {
        formActionPage: currentPath,
        radioInput: {
            name: 'selectedSBI',
            fieldset: {
                legend: {
                    text: 'Choose demonstration scenario',
                    isPageHeading: true,
                    classes: 'govuk-fieldset__legend--l'
                }
            },
            items: [],
            id: 'chooseScenario'
        }
    }

    model.radioInput.items = [
        {
            value: '200599768',
            text: 'Sarah\'s Farm',
            hint: {
                text: 'Sarah does not have any existing agreements in place and she wishes to apply for one farming incentive on one piece of her land.'
            }
        },
        {
            value: '106846848',
            text: 'John\'s Farm (future scenario)',
            hint: {
                text: 'A more complex scenario where there are existing agreements in place.'
            },
            disabled: true
        }
    ]

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
            return h.view(viewTemplate, createModel())
        }
    },
    {
        method: 'POST',
        path: currentPath,
        options: {
            auth: false
        },
        handler: (request, h) => {
            if (!request.payload.selectedSBI) {
                const currentModel = createModel()
                return h.view(viewTemplate, {
                    ...currentModel,
                    errorList: [
                        {
                            text: 'Please select a scenario',
                            href: '#chooseScenario'
                        }
                    ]
                })
            }
            setYarValue(request, 'chosen-organisation', request.payload.selectedSBI)
            const grantID = 'a01WT00001tGtA2YAK'
            const questionBankData = questionBank
            if (!getYarValue(request, 'grant-information')) {
                setYarValue(request, 'grant-information', questionBankData)
                const allQuestions = []
                questionBankData.themes.forEach(({questions}) => {
                    allQuestions.push(...questions)
                })
                setYarValue(request, 'grant-questions', allQuestions)
                if (!global.addedGrantIDs.includes(grantID)) {
                    const pages = questionBankData.themes
                        .map(section => drawSectionGetRequests(section, grantID))[0]
                        .concat(
                            questionBankData.themes.map(section =>
                                drawSectionPostRequests(section, grantID)
                            )[0]
                        )
                    request.server.route(pages)
                    global.addedGrantIDs.push(grantID);
                }
            }
            const startUrl = questionBankData.themes[0].questions.find(
                theme => theme.journeyStart
            ).url
            return h.redirect(`${urlPrefix}/${grantID}/${startUrl}`)
        }
    }
]
