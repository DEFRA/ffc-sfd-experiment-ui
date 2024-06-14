const { getHtml } = require('../helpers/conditionalHTML')
const { setOptionsLabel } = require('../helpers/answer-options')
const { getYarValue, setYarValue } = require('../helpers/session')
const urlPrefix = require('../config/server').urlPrefix
const { formatUKCurrency } = require('../helpers/data-formats')
const Uuid = require('uuid')
const getConfirmationId = () => {
  const guid = Uuid.v4()
  const prefix = 'FG'
  return `${prefix}-${guid.substr(0, 3)}-${guid.substr(3, 3)}`.toUpperCase()
}

const handleConditinalHtmlData = (type, labelData, yarKey, request) => {
  const isMultiInput = type === 'multi-input'
  const label = isMultiInput ? 'sbi' : yarKey
  const fieldValue = isMultiInput ? getYarValue(request, yarKey)?.sbi : getYarValue(request, yarKey)
  return getHtml(label, labelData, fieldValue)
}

const saveValuesToArray = (yarKey, fields) => {
  const result = []

  if (yarKey) {
    fields.forEach(field => {
      if (yarKey[field]) {
        result.push(yarKey[field])
      }
    })
  }

  return result
}

const getCheckDetailsModel = (request, question) => {
  setYarValue(request, 'reachedCheckDetails', true)
  const farmerData = getYarValue(request, 'account-information')
  const chosenOrganisation = getYarValue(request, 'chosen-organisation')
  const grantInformation = getYarValue(request, 'grant-information')
  const grantId = grantInformation.grantScheme.grantID
  const scoreArray = []
  let totalScore = undefined
  if (question.summarySections) {
    question.summarySections.forEach((summary) => {
      if (summary.type === 'simple') {
        summary.rows.forEach((row) => {
          let value = getYarValue(request, row.yarKey)
          // Checks if the value to be displayed needs formatting
          if (row.format) {
            switch (row.format) {
              case "currency": 
                value = '£' + formatUKCurrency(value)
              default:
                break
            }
          }
          // Adds the specific fields for it to render in the gov summayr list
          row.value = {
            text: value
          }
          let rowTitle = row.title
          // Checks to see if the summary title needs a yar key replacing with a value
          if (rowTitle?.includes('{{_')) {
            const cleanUpYarKey = RegExp(/{{_(.+?)_}}/ig).exec(rowTitle)[1]
            rowTitle = rowTitle.replace(/{{_(.+?)_}}/, getYarValue(request, cleanUpYarKey))
          }
          row.key = {
            text: rowTitle
          }
          if (row.changeUrl) {
            row.actions = {
              items: [
                {
                  href: `${urlPrefix}/${grantId}/${row.changeUrl}`,
                  text: "Change",
                }
              ]
            }
          }
        })
      } else if (summary.type === 'items') {
        const questionWithItems = getYarValue(request, 'grant-questions').find((question) => question.type === 'item-list')
        if (questionWithItems.itemList && questionWithItems.itemList.length > 0) {
          const data = getYarValue(request, summary.yarKey)
          // Formats the question and data so it can be displayed on the summary page
          summary.itemDisplay = questionWithItems.itemList.map((item) => {
            if (data[item.equipmentId]) {
              const price = parseInt(item.referenceValue, 10)
              let totalValue = 0
              totalValue += price * parseInt(data[item.equipmentId], 10)
              // Adds the items score to an array to keep track of whats been selected
              scoreArray.push(parseInt(item.score, 10))
              return {
                ...item,
                formattedPrice: formatUKCurrency(item.referenceValue),
                quantity: data[item.equipmentId],
                itemTotalPrice: totalValue,
                formattedTotalPrice: formatUKCurrency(totalValue)
              }
            } else {
              // We only want to display the items the user has selected prevously so if 
              // there is no value for the individual item in the yarKey then we can remove it from being displayed
              return {}
            }
          }).filter((item) => item.quantity)
          summary.totalGrantValue = formatUKCurrency(summary.itemDisplay.reduce((previousValue, currentValue) => previousValue + currentValue.itemTotalPrice ,0))
        }
      }
    })
  }
  if (scoreArray.length > 0) {
    const numberOfItems = scoreArray.length;
    const itemScoreTotal = scoreArray.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
    totalScore = (itemScoreTotal / numberOfItems).toFixed(2)
  }
  const chosenFarm = farmerData.companies.find((company) => company.id === chosenOrganisation)
  return {
    ...question,
    backUrl: `${urlPrefix}/${grantId}/${question.backUrl}`,
    farmerData,
    chosenOrganisation,
    headerData: {
      chosenFarm: chosenFarm.name,
      sbi: chosenFarm.sbi,
      firstName: farmerData.firstName,
      lastName: farmerData.lastName
    },
    totalScore
  }
}

const getEvidenceSummaryModel = (request, question, backUrl, nextUrl) => {
  setYarValue(request, 'reachedEvidenceSummary', true)

  const planningPermission = getYarValue(request, 'planningPermission')
  const gridReference = getYarValue(request, 'gridReference').toUpperCase()
  const hasEvidence = planningPermission && !planningPermission.startsWith('Not yet applied')
  const PlanningPermissionEvidence = getYarValue(request, 'PlanningPermissionEvidence')

  if (hasEvidence && !PlanningPermissionEvidence) {
    return { redirect: true }
  }
  if (!hasEvidence) {
    setYarValue(request, 'PlanningPermissionEvidence', null)
  }

  return ({
    ...question.pageData,
    backUrl,
    nextUrl,
    planningPermission,
    gridReference,
    ...(hasEvidence
      ? {
          evidence: {
            planningAuthority: PlanningPermissionEvidence?.planningAuthority,
            planningReferenceNumber: PlanningPermissionEvidence?.planningReferenceNumber.toUpperCase()
          }
        }
      : {}
    )
  })
}

const getDataFromYarValue = (request, yarKey, type) => {
  let data = getYarValue(request, yarKey) || null
  if (type === 'multi-answer' && !!data) {
    data = [data].flat()
  }

  return data
}

const getConsentOptionalData = (consentOptional) => {
  return {
    hiddenInput: {
      id: 'consentMain',
      name: 'consentMain',
      value: 'true',
      type: 'hidden'
    },
    idPrefix: 'consentOptional',
    name: 'consentOptional',
    items: setOptionsLabel(consentOptional,
      [{
        value: 'CONSENT_OPTIONAL',
        text: '(Optional) I consent to being contacted about improvement services'
      }]
    )
  }
}

module.exports = {
  getConfirmationId,
  handleConditinalHtmlData,
  getCheckDetailsModel,
  getEvidenceSummaryModel,
  getDataFromYarValue,
  getConsentOptionalData
}
