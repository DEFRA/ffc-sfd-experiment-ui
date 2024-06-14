const { INTERGERS_AND_DECIMALS } = require('./regex')
const { formatUKCurrency } = require('../helpers/data-formats')

const formatTempObject = (item, keyTitle, suffixAndLengthValue, catagoryData) => {
  const maxValue = suffixAndLengthValue.length === 3 ? 9999 : 999999
  item.amount = formatUKCurrency(item.amount)
  const span = `<span class="govuk-visually-hidden">How many ${item.unit} of this item will be required: </span>`
  return {
    yarKey: item.item.replace(/[- ,)(]/g, ''), // Could add key to db list, to be used for populating yar?
    type: 'text',
    inputmode: 'numeric',
    pattern: '[0-9]*',
    suffix: { text: suffixAndLengthValue.unit },
    hint: {
      text: `Grant amount: £${item.amount} ${item.unit}`
    },
    classes: `govuk-input--width-${suffixAndLengthValue.length}`,
    label: {
      html: span + item.item,
      classes: 'govuk-label--m'
    },
    validate: [
      {
        type: 'NOT_EMPTY',
        error: `Enter ${keyTitle} ${catagoryData.errorType.toLowerCase()}`
      },
      {
        type: 'REGEX',
        regex: INTERGERS_AND_DECIMALS,
        error: `${catagoryData.errorType} must only include numbers`
      },
      {
        type: 'INCLUDES',
        checkArray: ['.'],
        error: `${catagoryData.errorType} must be a whole number`
      },
      {
        type: 'MIN_MAX',
        min: 1,
        max: maxValue,
        error: `${catagoryData.errorType} must be between 1-${maxValue}`
      }
    ]
  }
}

function suffixAndLengthGenerator (item, unit) {
  switch (unit) {
    case 'per cubic metre':
      return { unit: 'm³', length: 3 }
    case 'per metre':
      return { unit: 'metre(s)', length: 3 }
    default:
      return { unit: 'item(s)', length: 3 }
  }
}

function keyGenerator (title, key) {
  // format key name for NOT_EMPTY validation
  switch (key) {
    case 'cat-reception-pit-type':
      return 'reception pit'
    case 'cat-pump-type':
      return 'pump'
    default:
      return title.toLowerCase()
  }
}

function getErrorUnit (catagory) {
  const volumeArray = ['cat-reception-pit-type', 'cat-pipework', 'cat-transfer-channels']
  const errorType = volumeArray.includes(catagory) ? 'Volume' : 'Quantity'

  return { errorType: errorType }
}

function formatOtherItems (request) {
  const object = request.yar.get('referenceCostObject')
  const otherItemsArray = [request.yar.get('otherItems')].flat()
  const listOfCatagories = ['cat-reception-pit-type', 'cat-pump-type', 'cat-pipework', 'cat-transfer-channels', 'cat-agitator', 'cat-safety-equipment']

  const returnArray = []

  if (object?.data && otherItemsArray.length > 0) {
    otherItemsArray.forEach((otherItem, _index) => {
      for (const catagory in listOfCatagories) {
        const selectedCatagory = object.data.desirability.catagories.find(({ key }) => key === listOfCatagories[catagory])

        selectedCatagory.items.forEach((item) => {
          if (item.item === otherItem) {
            const suffixAndLengthValue = suffixAndLengthGenerator(item.item, item.unit)
            const keyTitle = keyGenerator(selectedCatagory.title, selectedCatagory.key)
            const catagoryData = getErrorUnit(listOfCatagories[catagory])

            const tempObject = formatTempObject(item, keyTitle, suffixAndLengthValue, catagoryData)

            returnArray.push(tempObject)
          }
        })
      }
    })
  }

  return returnArray
}

module.exports = {
  formatOtherItems
}
