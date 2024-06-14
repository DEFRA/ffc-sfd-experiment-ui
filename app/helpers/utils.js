const { getYarValue } = require('../helpers/session')

const notUniqueSelection = (answers, option) => (
  answers?.includes(option) &&
    typeof (answers) === 'object' &&
    answers.length > 1
)

const uniqueSelection = (answers, option) => (
  answers?.includes(option) &&
    (typeof (answers) === 'string' ||
      (typeof (answers) === 'object' && answers.length === 1)
    )
)

const getQuestionByKey = (request, questionKey) => {
  const allQuestions = getYarValue(request, 'grant-questions')
  return allQuestions.find(({ key }) => (key === questionKey))
}

const getQuestionAnswer = (request, questionKey, answerKey) => {
  const question = getQuestionByKey(request, questionKey)
  return (question.answers.find(({ key }) => (key === answerKey))?.value)
}

module.exports = {
  notUniqueSelection,
  uniqueSelection,
  getQuestionByKey,
  getQuestionAnswer
}
