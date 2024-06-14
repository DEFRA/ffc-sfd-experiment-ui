const isInteger = (number) => {
  return (number - Math.floor(number)) === 0
}

const formatUKCurrency = (costPounds) => {
  costPounds = costPounds.toString().replace(/,/g, '')
  return isInteger(costPounds)
    ? Number(costPounds).toLocaleString('en-GB')
    : Number(costPounds).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const calculateScore = () => {
  let scoreArray = []
  document.querySelectorAll('form[id="items-list"] input.govuk-input--width-3').forEach((input) => {
    if (input.value !== '') {
      const score = document.querySelector(`div[id="${input.name}-score"]`).innerHTML.split(':')[1].trim()
      scoreArray.push(parseInt(score, 10))
    }
  })
  let totalScore = 0
  if (scoreArray.length > 0) {
    const numberOfItems = scoreArray.length;
    const itemScoreTotal = scoreArray.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
    totalScore = (itemScoreTotal / numberOfItems).toFixed(2)
  }
  document.querySelector('p[id="score-total"]').innerHTML = totalScore
}

const calculateGrantTotal = () => {
  const calculateGrantTotal = [...document.querySelectorAll('div[id$="-total"]')]
    .reduce((previousValue, currentValue) => previousValue + parseInt(currentValue.innerHTML.substring(1).replace(',', ''), 10) ,0)
  let grantTotalDisplayValue
  if (calculateGrantTotal === 0) {
    grantTotalDisplayValue = '0.00'
  } else {
    grantTotalDisplayValue = formatUKCurrency(calculateGrantTotal)
  }
  document.querySelector('p[id="grant-total"]').innerHTML = `£${grantTotalDisplayValue}`
}

const calculateItemTotal = (equipmentId, numberOfItems) => {
  const itemValue = document.querySelector(`div[id="${equipmentId}-price"]`).innerHTML
  let newTotal
  if (numberOfItems === 0) {
    newTotal = '0.00'
  } else {
    newTotal = formatUKCurrency(parseInt(itemValue.substring(1).replace(",", ''), 10) * numberOfItems)
  }
  const totalElm = document.querySelector(`div[id="${equipmentId}-total"]`)
  totalElm.innerHTML = `£${newTotal}`
}

const updateValues = (eventValue, targetName) => {
  let numberOfItems 
  if (eventValue === '') {
    numberOfItems = 0
  } else {
    numberOfItems = parseInt(eventValue, 10)
  } 
  if (typeof numberOfItems === 'number') {
    calculateItemTotal(targetName, numberOfItems)

    calculateGrantTotal()

    calculateScore()
  }
}

export function itemsListChecker () {
  const elements = document.querySelector('form[id="items-list"]')
  if (elements) {
    const listOfInputs = document.querySelectorAll('form[id="items-list"] input.govuk-input--width-3')
    listOfInputs.forEach((input) => {
      input.addEventListener('keyup', (event)=> {
        updateValues(event.target.value, event.target.name)
      })
      if (input.value !== '') {
        console.log('Page loaded with a value already in input most likely due to an error on submission', input.name)
        updateValues(input.value, input.name)
      }
    })
  }
}