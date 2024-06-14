const { YAR_KEYS } = require('../config/question-bank')
const Joi = require('joi')
const { getYarValue } = require('../helpers/session')

function getAllDetails (request, confirmationId) {
  return YAR_KEYS.reduce(
    (allDetails, key) => {
      allDetails[key] = getYarValue(request, key)
      return allDetails
    },
    { confirmationId }
  )
}

const desirabilityAnswersSchema = Joi.object({
  productsProcessed: Joi.string(),
  howAddingValue: Joi.string(),
  projectImpact: Joi.array().items(Joi.string()),
  futureCustomers: Joi.array().items(Joi.string()),
  collaboration: Joi.string(),
  environmentalImpact: Joi.array().items(Joi.string())
})

function getDesirabilityAnswers (request) {
  try {
    let envImpactVal = getYarValue(request, 'environmentalImpact')
    envImpactVal = Array.isArray(envImpactVal) ? envImpactVal : [envImpactVal]
    const val = {
      productsProcessed: getYarValue(request, 'productsProcessed'),
      howAddingValue: getYarValue(request, 'howAddingValue'),
      projectImpact: [getYarValue(request, 'projectImpact')].flat(),
      futureCustomers: [getYarValue(request, 'futureCustomers')].flat(),
      collaboration: getYarValue(request, 'collaboration'),
      environmentalImpact: envImpactVal
    }
    const result = desirabilityAnswersSchema.validate(val, {
      abortEarly: false
    })
    if (result.error) {
      throw new Error(`The scoring data is invalid. ${result.error.message}`)
    }
    return result.value
  } catch (ex) {
    console.log(ex, 'error')
    return null
  }
}

module.exports = {
  getDesirabilityAnswers,
  getAllDetails
}
