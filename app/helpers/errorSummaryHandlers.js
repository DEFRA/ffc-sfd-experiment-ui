const { getModel } = require('../helpers/models')
const { getHtml } = require('../helpers/conditionalHTML')
const { getYarValue } = require('../helpers/session')
const { formatOtherItems } = require('./../helpers/other-items-sizes')
const { formatUKCurrency } = require('../helpers/data-formats')
const { validateAnswerField, checkInputError } = require('../helpers/errorHelpers')

const customiseErrorText = (value, currentQuestion, errorList, h, request) => {
  const { yarKey, type, conditionalKey, conditionalLabelData } = currentQuestion
  let conditionalHtml

  if (conditionalKey) {
    const conditionalFieldError = errorList.find(thisErrorHref => thisErrorHref.href.includes(conditionalKey))?.text
    const conditionalFieldValue = (type === 'multi-input') ? getYarValue(request, yarKey)[conditionalKey] : getYarValue(request, conditionalKey)
    conditionalHtml = getHtml(conditionalKey, conditionalLabelData, conditionalFieldValue, conditionalFieldError)
  }
  const baseModel = getModel(value, currentQuestion, request, conditionalHtml)

  if (type === 'multi-input') {
    const baseModelItems = baseModel.items.map(thisItem => {
      const matchingErrorHref = errorList.find(thisErrorHref => thisErrorHref.href.includes(thisItem.id))

      if (matchingErrorHref) {
        return {
          ...thisItem,
          errorMessage: { text: matchingErrorHref.text }
        }
      }
      return thisItem
    })
    baseModel.items = [
      ...baseModelItems
    ]
  } else {
    baseModel.items = {
      ...baseModel.items,
      ...(errorList[0].href.includes(yarKey) ? { errorMessage: { text: errorList[0].text } } : {})
    }
  }
  const modelWithErrors = {
    ...baseModel,
    errorList
  }
  const template = currentQuestion.type === 'item-list' ? 'item-list' : 'page'
  return h.view(template, modelWithErrors)
}

const checkErrors = (payload, currentQuestion, h, request) => {
  const { yarKey, answers, validate } = currentQuestion
  const conditionalAnswer = answers?.find(answer => answer.conditional)
  const errorHrefList = []
  let isconditionalAnswer
  let placeholderInputError
  if (yarKey === 'gridReference') payload[yarKey] = payload[yarKey].replace(/\s/g, '')
  if (currentQuestion.type === 'multi-input') {
    const allFields = (currentQuestion.costDataKey) ? formatOtherItems(request) : currentQuestion.allFields

    allFields.forEach(
      ({ yarKey: inputYarKey, validate: inputValidate, answers: inputAnswers }) => {
        isconditionalAnswer = inputAnswers?.find(answer => answer.conditional)?.value === payload[inputYarKey]

        if (inputValidate) {
          placeholderInputError = checkInputError(request, inputValidate, isconditionalAnswer, payload, inputYarKey)

          if (placeholderInputError) {
            errorHrefList.push({
              text: placeholderInputError.error,
              href: `#${placeholderInputError.dependentKey ?? inputYarKey}`
            })
          }
        }
      }
    )

    if (errorHrefList.length > 0) {
      return customiseErrorText(payload, currentQuestion, errorHrefList, h, request)
    }
  }
  if (Object.keys(payload).length === 0 && currentQuestion.type) {
    placeholderInputError = validate.find(
      ({ type, dependentKey, ...details }) => (validateAnswerField(request, payload[yarKey], type, details, payload) === false))

    errorHrefList.push({
      text: placeholderInputError.error,
      href: `#${placeholderInputError.dependentKey ?? yarKey}`
    })
    return customiseErrorText('', currentQuestion, errorHrefList, h, request)
  }

  if (currentQuestion.type === 'item-list') {
    // Checks each item to see if any inputs cause errors
    for (const [key, value] of Object.entries(payload)) {
      const itemData = currentQuestion.itemList.find((item) => item.equipmentId.toString() === key)
      const quantityLimit = itemData ? itemData.quantityLimit : undefined
      placeholderInputError = checkInputError(request, validate, isconditionalAnswer, value, yarKey, quantityLimit)

      if (placeholderInputError) {
        errorHrefList.push({
          text: placeholderInputError.error,
          href: `#${itemData.equipmentId}`
        })
      }
    }
    const maxGrant = currentQuestion.grantInfo.maxGrant
    const minGrant = currentQuestion.grantInfo.minGrant
    let totalValue = 0
    // Checks to see if the total items cost are within the grant limits
    for (const [key, value] of Object.entries(payload)) {
      if (value) {
        const price = parseInt(currentQuestion.itemList.find((item) => item.equipmentId.toString() === key).referenceValue, 10)
        totalValue += price * parseInt(value, 10)
      }
    }
    if (totalValue < minGrant) {
      errorHrefList.push({
        text: `Total value does not reach mimimum grant ammount of £${formatUKCurrency(minGrant)}`,
        href: "#items-list"
      })
    } else if (totalValue > maxGrant) {
      errorHrefList.push({
        text: `Total value exceeds maximum grant ammount of £${formatUKCurrency(maxGrant)}`,
        href: "#items-list"
      })
    }
    if (errorHrefList.length > 0) {
      return customiseErrorText(payload, currentQuestion, errorHrefList, h, request)
    } else {
      return false
    }
  }
 
  const payloadValue = typeof payload[yarKey] === 'string' ? payload[yarKey].trim() : payload[yarKey]
  isconditionalAnswer = payload[yarKey]?.includes(conditionalAnswer?.value)
  if (validate) {
    placeholderInputError = checkInputError(request, validate, isconditionalAnswer, payload, yarKey)

    if (placeholderInputError) {
      errorHrefList.push({
        text: placeholderInputError.error,
        href: `#${placeholderInputError.dependentKey ?? yarKey}`
      })
    }
  }

  if (errorHrefList.length > 0) {
    return customiseErrorText(payloadValue, currentQuestion, errorHrefList, h, request)
  }
}

module.exports = {
  customiseErrorText,
  checkErrors
}
