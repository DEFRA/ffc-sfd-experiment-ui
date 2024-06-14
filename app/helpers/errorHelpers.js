const { getQuestionAnswer } = require('../helpers/utils')
const {
  POSTCODE_REGEX,
  WHOLE_NUMBER_REGEX,
} = require('../helpers/regex')

const regexTransformer = {
  "WHOLE_NUMBER_REGEX": WHOLE_NUMBER_REGEX,
  "POSTCODE_REGEX": POSTCODE_REGEX
}

const validateAnswerField = (request, value, validationType, details, payload, quantityLimit = undefined) => {
  switch (validationType) {
    case 'NOT_EMPTY': {
      return (!!value)
    }

    case 'NOT_EMPTY_EXTRA': {
      if (value) {
        return true
      }

      const { extraFieldsToCheck } = details
      return extraFieldsToCheck.some(extraField => (
        !!payload[extraField]
      ))
    }

    case 'STANDALONE_ANSWER': {
      const selectedAnswer = [value].flat()
      const {
        standaloneObject: {
          questionKey: standaloneQuestionKey,
          answerKey: standaloneAnswerKey
        }
      } = details
      const standAloneAnswer = getQuestionAnswer(request, standaloneQuestionKey, standaloneAnswerKey)

      if (selectedAnswer.includes(standAloneAnswer)) {
        return selectedAnswer.length === 1
      }
      return true
    }

    case 'COMBINATION_ANSWER': {
      const selectedAnswer = [value].flat()
      const {
        combinationObject: {
          questionKey: combinationQuestionKey,
          combinationAnswerKeys
        }
      } = details
      const combinationanswers = combinationAnswerKeys.map(answerKey => getQuestionAnswer(request, combinationQuestionKey, answerKey))

      if (selectedAnswer.includes(combinationanswers[0]) && selectedAnswer.length > 1) {
        return selectedAnswer.every((answer, index) => answer === combinationanswers[index])
      }

      return true
    }

    case 'REGEX': {
      let { regex } = details
      regex = regexTransformer[regex]
      return (!value || regex.test(value))
    }

    case 'MIN_MAX_CHARS': {
      const { min, max } = details
      return (value.length >= min && value.length <= max)
    }

    case 'MIN_MAX': {
      const { min, max } = details
      return isNaN(value) ? false : (value >= min && value <= max)
    }

    case 'INCLUDES': {
      const { checkArray } = details
      return (checkArray.every((charToCheck) => !value.includes(charToCheck)))
    }

    case 'EXCLUDES': {
      const { checkArray } = details
      return (!!checkArray.find((charToCheck) => value.toLowerCase().includes(charToCheck.toLowerCase())))
    }

    case 'MAX_SELECT': {
      const { max } = details
      return ([value].flat().length <= max)
    }

    case 'QUANTITY': {
      return quantityLimit ? value <= quantityLimit : true
    }
    default:
      return false
  }
}

const checkInputError = (request, validate, isconditionalAnswer, payload, yarKey, quantityLimit) => {
  return validate.find(
    ({ type, dependentKey, ...details }) => (isconditionalAnswer && dependentKey)
      ? (validateAnswerField(request, payload[dependentKey], type, details, payload) === false)
      : !dependentKey && (validateAnswerField(request, (payload[yarKey] !== undefined && payload[yarKey] !== null) ? payload[yarKey] : payload, type, details, payload, quantityLimit) === false)
  )
}

module.exports = {
  validateAnswerField,
  checkInputError
}
