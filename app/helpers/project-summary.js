const { formatUKCurrency } = require('../helpers/data-formats')

function suffixGenerator (unit) {
  // add correct suffix value to input field
  if (unit === 'per cubic metre') {
    return 'm³'
  } else if (unit === 'per square metre') {
    return 'm²'
  } else if (unit === 'per metre') {
    return 'm'
  } else {
    return '' // per pump, per tank and per item
  }
}

function formatSummaryTable (request) {
  const object = request.yar.get('referenceCostObject')
  const storageType = request.yar.get('storageType')
  const storageSize = request.yar.get('serviceCapacityIncrease')
  const coverType = request.yar.get('coverType')
  const coverSize = request.yar.get('coverSize')
  const existingCoverType = request.yar.get('existingCoverType')
  const existingCoverSize = request.yar.get('existingCoverSize')
  // separator
  const otherItemsArray = [request.yar.get('otherItems')].flat()
  const separatorArray = [request.yar.get('separatorOptions')].flat()

  const listOfCatagories = ['cat-separator', 'cat-reception-pit-type', 'cat-pump-type', 'cat-pipework', 'cat-transfer-channels', 'cat-agitator', 'cat-safety-equipment']

  const returnArray = []

  let totalCalculator = 0
  let total

  if (object?.data && otherItemsArray.length > 0) {
    if (storageSize) {
      // create storage object
      const storageKey = object.data.desirability.catagories.find(({ key }) => key === 'cat-storage')

      const storageData = storageKey.items.find(({ item }) => item === storageType)

      total = (storageSize * storageData.amount)

      returnArray.push({
        item: storageType,
        amount: '£' + storageData.amount,
        quantity: formatUKCurrency(storageSize) + 'm³',
        total: '£' + formatUKCurrency(total)
      })

      totalCalculator += total
    }

    // create cover object
    if (coverSize) {
      const coverKey = object.data.desirability.catagories.find(({ key }) => key === 'cat-cover-type')

      const coverData = coverKey.items.find(({ item }) => item === coverType)

      total = (coverSize * coverData.amount)

      returnArray.push({
        item: (coverType.substring(0, coverType.lastIndexOf(' ')) + ' grant-funded store cover'),
        amount: '£' + coverData.amount,
        quantity: formatUKCurrency(coverSize) + 'm²',
        total: '£' + formatUKCurrency(total)
      })

      totalCalculator += total
    }

    if (existingCoverSize) {
      const existingCoverKey = object.data.desirability.catagories.find(({ key }) => key === 'cat-cover-type')

      const existingCoverData = existingCoverKey.items.find(({ item }) => item === existingCoverType)

      total = (existingCoverSize * existingCoverData.amount)

      returnArray.push({
        item: existingCoverType.substring(0, existingCoverType.lastIndexOf(' ')) + ' existing store cover',
        amount: '£' + existingCoverData.amount,
        quantity: formatUKCurrency(existingCoverSize) + 'm²',
        total: '£' + formatUKCurrency(total)
      })

      totalCalculator += total
    }

    if (separatorArray.length > 0) {
      separatorArray.forEach((otherItem, _index) => {
        let correctSize

        // if concrete bunker, get size. Else use size from conditional
        if (otherItem === 'Concrete bunker') {
          correctSize = request.yar.get('concreteBunkerSize')
        } else {
          correctSize = 1
        }

        listOfCatagories.forEach((catagory, _index2) => {
          const selectedCatagory = object.data.desirability.catagories.find(({ key }) => key === catagory)
          selectedCatagory.items.forEach((item) => {
            if (item.item === otherItem) {
              const unit = suffixGenerator(item.unit)

              total = item.item === 'Concrete bunker' && Number(correctSize) > 100 ? Number(String(request.yar.get('cappedAmount')).replace(/,/g, '')) : Number(correctSize) * Number((String(item.amount)).replace(/,/g, ''))

              returnArray.push({
                item: otherItem,
                amount: '£' + formatUKCurrency(item.amount),
                quantity: formatUKCurrency(correctSize) + unit,
                total: '£' + formatUKCurrency(total)
              })
              totalCalculator += total
            }
          })
        })
      })
    }

    if (otherItemsArray[0] !== 'None of the above') {
      // pull otherItemsSizes object. Can only be done after checking if other items has data
      const otherItemSizes = [request.yar.get('itemSizeQuantities')].flat()

      // create all objects needed for other items
      otherItemsArray.forEach((otherItem, _index) => {
        const createdKey = otherItem.replace(/[- ,)(]/g, '')

        const correctSize = otherItemSizes[0][createdKey]

        listOfCatagories.forEach((catagory, _index2) => {
          const selectedCatagory = object.data.desirability.catagories.find(({ key }) => key === catagory)

          selectedCatagory.items.forEach((item) => {
            if (item.item === otherItem) {
              const unit = suffixGenerator(item.unit)

              total = (correctSize * String(item.amount).replace(/,/g, ''))

              returnArray.push({
                item: otherItem,
                amount: '£' + formatUKCurrency(item.amount),
                quantity: formatUKCurrency(correctSize) + unit,
                total: '£' + formatUKCurrency(total)
              })

              totalCalculator += total
            }
          })
        })
      })
    }
  }

  request.yar.set('itemsTotalValue', totalCalculator)

  return returnArray
}

module.exports = {
  formatSummaryTable
}
