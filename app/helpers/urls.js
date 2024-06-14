const urlPrefix = require('../config/server').urlPrefix
const { getYarValue } = require('../helpers/session')
const { getQuestionAnswer } = require('../../app/helpers/utils.js')

// const isPigFarmer = getQuestionAnswer('applicant-type', 'applicant-type-A1')
// const isBackToScoreBtn = (btn) => btn === 'Back to score'
const planningSummary = `${urlPrefix}/planning-permission-summary`
const findDependentQuestion = (
  dependentQuestionYarKey,
  dependentAnswerKeysArray,
  dependentAnswer,
  request
) => {
  const allQuestions = getYarValue(request, 'grant-questions')
  return allQuestions.find((thisQuestion) => {
    const hasMatchingAnswer = thisQuestion.answers?.some((answer) => {
      return (
        dependentAnswer &&
        dependentAnswerKeysArray.includes(answer.key) &&
        dependentAnswer.includes(answer.value)
      )
    })
    return thisQuestion.yarKey === dependentQuestionYarKey && hasMatchingAnswer
  })
}

const getUrl = (urlObject, url, request, secBtn, currentUrl) => {
  const scorePath = `${urlPrefix}/score`
  const chekDetailsPath = `${urlPrefix}/check-details`
  const secBtnPath = getBtnPath(secBtn, scorePath, currentUrl, chekDetailsPath)
  if (!urlObject) {
    return secBtn ? secBtnPath : url
  }
  const { dependentQuestionYarKey, dependentAnswerKeysArray, urlOptions } = urlObject
  let { thenUrl, elseUrl, nonDependentUrl } = urlOptions
  if (
    getYarValue(request, 'applicantType') === isPigFarmer &&
    nonDependentUrl === 'existing-cover'
  ) {
    nonDependentUrl = 'existing-cover-pig'
  } else if (
    getYarValue(request, 'applicantType') === isPigFarmer &&
    elseUrl === 'existing-cover'
  ) {
    elseUrl = 'existing-cover-pig'
  } else if (
    getYarValue(request, 'applicantType') === isPigFarmer &&
    thenUrl === 'capacity-increase-replace' &&
    elseUrl === 'capacity-increase-additional'
  ) {
    thenUrl = 'pig-capacity-increase-replace'
    elseUrl = 'pig-capacity-increase-additional'
  }
  const dependentAnswer = getYarValue(request, dependentQuestionYarKey)
  const selectThenUrl = findDependentQuestion(dependentQuestionYarKey, dependentAnswerKeysArray, dependentAnswer, request)
  const selectedElseUrl = dependentAnswer ? elseUrl : nonDependentUrl
  return selectThenUrl ? thenUrl : selectedElseUrl
}

function getBtnPath (secBtn, scorePath, currentUrl, chekDetailsPath) {
  if (secBtn === 'Back to score') {
    return scorePath
  } else {
    switch (currentUrl) {
      case 'planning-permission':
      case 'planning-permission-evidence':
      case 'grid-reference': {
        return planningSummary
      }
      default:
        return chekDetailsPath
    }
  }
}

module.exports = {
  getUrl
}
