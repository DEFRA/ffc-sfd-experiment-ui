const { getUrl } = require('../helpers/urls')
const { getOptions } = require('../helpers/answer-options')
const { getYarValue, setYarValue } = require('../helpers/session')
const { formatUKCurrency } = require('../helpers/data-formats')
const urlPrefix = require('../config/server').urlPrefix

const getPrefixSufixString = (prefixSufix, selectedValueOfLinkedQuestion) => {
  if (prefixSufix.linkedPrefix || prefixSufix.linkedSufix) {
    selectedValueOfLinkedQuestion = prefixSufix.linkedPrefix.concat(selectedValueOfLinkedQuestion)
  }
  if (prefixSufix.linkedSufix) {
    selectedValueOfLinkedQuestion = selectedValueOfLinkedQuestion.concat(prefixSufix.linkedSufix)
  }
  return selectedValueOfLinkedQuestion
}

const getDependentSideBar = (sidebar, request) => {
  const { values, dependentQuestionKeys } = sidebar
  dependentQuestionKeys.forEach((dependentQuestionKey, index) => {
    values[index].content[0].items = []

    // const yarKey = getQuestionByKey(dependentQuestionKey).yarKey
    let selectedAnswers = getYarValue(request, dependentQuestionKey)

    if (selectedAnswers === null) {
      // dependentQuestionKeys.slice(dependentQuestionKeys[dependentQuestionKey])
      values[index].heading = null
      values[index].content.slice()
    } else {
      switch (dependentQuestionKey) {
        case 'storageType':
          values[index].heading = 'Grant-funded store'
          break
        case 'coverType':
          values[index].heading = 'Grant-funded store cover'
          break
        case 'existingCoverType':
          values[index].heading = 'Existing store cover'
          break
        case 'separatorOptions':
          values[index].heading = 'Separator'

          if (request.route.path === '/tech-evaluation/separator-type') {
            setYarValue(request, 'separatorOptions', [])
            selectedAnswers = []
          } else if (request.route.path === '/tech-evaluation/gantry') {
            const tempSeparatorVal = [getYarValue(request, 'separatorOptions')].flat()

            tempSeparatorVal.splice(1, tempSeparatorVal.length - 1)

            setYarValue(request, 'separatorOptions', tempSeparatorVal)
            selectedAnswers = tempSeparatorVal
          } else if (request.route.path === '/tech-evaluation/short-term-storage') {
            const tempSeparatorVal = [getYarValue(request, 'separatorOptions')].flat()

            if (tempSeparatorVal.includes('Gantry')) {
              tempSeparatorVal.splice(2, tempSeparatorVal.length - 2)
            } else {
              tempSeparatorVal.splice(1, tempSeparatorVal.length - 1)
            }

            setYarValue(request, 'separatorOptions', tempSeparatorVal)
            selectedAnswers = tempSeparatorVal
          }

          break
        case 'otherItems':
          values[index].heading = 'Other items'
          break
        default:
          break
      }

      values[index].content[0].items = [selectedAnswers].flat()

      if (sidebar.linkedQuestionyarkey && index < sidebar.linkedQuestionyarkey.length) {
        // const yarValueOfLinkedQuestion = getQuestionByKey(sidebar.linkedQuestionkey[index]).yarKey
        let selectedValueOfLinkedQuestion = getYarValue(request, sidebar.linkedQuestionyarkey[index])

        if (selectedValueOfLinkedQuestion && sidebar.prefixSufix) {
          selectedValueOfLinkedQuestion = getPrefixSufixString(sidebar.prefixSufix[index], formatUKCurrency(selectedValueOfLinkedQuestion))
        }

        values[index].content[0].items.push(selectedValueOfLinkedQuestion)
      }
    }
  })
  return {
    ...sidebar
  }
}

const getBackUrl = (hasScore, backUrlObject, backUrl, request) => {
  const url = getUrl(backUrlObject, backUrl, request)
  return url
}

const showBackToDetailsButton = (key, request) => {
  switch (key) {
    case 'farmer-details':
    case 'business-details':
    case 'applicant-details':
    case 'agent-details':
    case 'score': {
      return !!getYarValue(request, 'reachedCheckDetails')
    }
    default:
      return false
  }
}

const showBackToEvidenceSummaryButton = (key, request) => {
  switch (key) {
    case 'planning-permission':
    case 'planning-permission-evidence':
    case 'grid-reference': {
      return !!getYarValue(request, 'reachedEvidenceSummary')
    }
    default:
      return false
  }
}

const getModel = (data, question, request, conditionalHtml = '') => {
  let { type, backUrl, key, sidebar, title, hint, score, label, itemList } = question
  const hasScore = !!getYarValue(request, 'current-score')

  title = title ?? label?.text

  const farmerData = getYarValue(request, 'account-information')
  const chosenOrganisation = getYarValue(request, 'chosen-organisation')
  const grantInformation = getYarValue(request, 'grant-information')
  const grantId = grantInformation.grantScheme.grantID

  if (sidebar && sidebar.length > 0) {
    // Swaps out the yarKeys / grant ammounts from the sidebar text
    sidebar = sidebar.map((sideBarText) => {
      const itemsToReplace = sideBarText.match(/{{_(.+?)_}}/ig)
      if (!itemsToReplace || itemsToReplace.length === 0) {
        return sideBarText
      }
      itemsToReplace.forEach((item) => {
        const cleanUpYarKey = RegExp(/{{_(.+?)_}}/ig).exec(item)[1]
        let valueToReplace;
        if (cleanUpYarKey === "minGrant" || cleanUpYarKey === "maxGrant") {
          valueToReplace = `£${formatUKCurrency(question.grantInfo[cleanUpYarKey])}`
        } else {
          valueToReplace = getYarValue(request, cleanUpYarKey)
        }
        sideBarText = sideBarText.replace(item, valueToReplace)
      })
      return sideBarText
    });
  }

  if (itemList && itemList.length > 0) {
    itemList = itemList.map((item) => {
      return {
        ...item,
        formattedPrice: formatUKCurrency(item.referenceValue),
        quantityInput: {
          label: {
            text: "Quantity"
          },
          classes: "govuk-input--width-3",
          name: `${item.equipmentId}`,
          value: data && data[item.equipmentId] ? data[item.equipmentId] : ""
        }
      }
    })
  }
  const updatedBackUrl = backUrl === 'portal' ? `${urlPrefix}/${backUrl}` : `${urlPrefix}/${grantId}/${backUrl}`
  const chosenFarm = farmerData.companies.find((company) => company.id === chosenOrganisation)
  return {
    type,
    key,
    title,
    hint,
    backUrl: updatedBackUrl,
    items: getOptions(data, question, conditionalHtml, request),
    headerData: {
      chosenFarm: chosenFarm.name,
      sbi: chosenFarm.sbi,
      firstName: farmerData.firstName,
      lastName: farmerData.lastName
    },
    sidebar,
    itemList,
    reachedCheckDetails: showBackToDetailsButton(key, request),
    reachedEvidenceSummary: showBackToEvidenceSummaryButton(key, request),
    diaplaySecondryBtn: hasScore && score?.isDisplay
  }
}

module.exports = {
  getModel
}
