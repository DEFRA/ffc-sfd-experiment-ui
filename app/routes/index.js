const urlPrefix = require('../config/server').urlPrefix
const { questionBank } = require('../config/question-bank')
const { getHandler, getPostHandler } = require('../helpers/handlers')

const drawSectionGetRequests = (section, grantID) => {
  return section.questions.map(question => {
    return {
      method: 'GET',
      path: `${urlPrefix}/${grantID}/${question.url}`,
      handler: getHandler(question)
    }
  })
}

const drawSectionPostRequests = (section, grantID) => {
  return section.questions.map((question) => {
    return {
      method: 'POST',
      path: `${urlPrefix}/${grantID}/${question.url}`,
      handler: getPostHandler(question)
    }
  })
}

// let pages = questionBank.themes.map(section => drawSectionGetRequests(section))
// pages = [...pages, ...questionBank.themes.map(section => drawSectionPostRequests(section))]
// pages.push(require('./reference-cost.js'), require('./project-summary'))
module.exports = {
  drawSectionGetRequests,
  drawSectionPostRequests
}
