const { formatUKCurrency } = require('./data-formats')
const { getYarValue } = require('./session')

const getHintText = (answer, hintArray, counter) => {
  const answerUnit = answer.item === 'Concrete bunker' ? 'per m²' : answer.unit

  if (hintArray && hintArray[counter - 1]) {
    return `${hintArray[counter - 1]} <br/> (Grant amount: £${answer.amount} ${answerUnit})`
  }
  return 'Grant amount: £' + formatUKCurrency(answer.amount) + ' ' + answerUnit
}

function formatAnswerArray (request, questionKey, catagoryKey, hintArray) {
  const object = getYarValue(request, 'referenceCostObject')
  const returnArray = []

  let listOfCatagories

  let counter = 1

  if (object?.data) {
    if (catagoryKey === 'other') {
      listOfCatagories = ['cat-reception-pit-type', 'cat-pump-type', 'cat-pipework', 'cat-transfer-channels', 'cat-agitator', 'cat-safety-equipment']
    } else {
      listOfCatagories = [catagoryKey]
    }

    for (const catagory in listOfCatagories) {
      const selectedCatagory = object.data.desirability.catagories.find(({ key }) => key === listOfCatagories[catagory])

      let tempObject

      for (const answer in selectedCatagory.items) {
        tempObject = {
          key: questionKey + '-A' + (counter),
          value: selectedCatagory.items[answer].item,
          sidebarFormattedValue: selectedCatagory.items[answer].item,
          hint: {
            html: getHintText(selectedCatagory.items[answer], hintArray, counter)
          },
          numericalValue: selectedCatagory.items[answer].amount
        }

        counter += 1

        returnArray.push(tempObject)
      }
    }
  }

  return returnArray
}

module.exports = {
  formatAnswerArray
}
