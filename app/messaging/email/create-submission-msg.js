const emailConfig = require('../config/email.js')
const spreadsheetConfig = require('../config/spreadsheet.js')
const { microTurnover, smallTurnover, mediumTurnover, microEmployeesNum, smallEmployeesNum, mediumEmployeesNum } = require('./business-size-constants')
const { getQuestionAnswer } = require('../../../app/helpers/utils.js')

function generateRow(rowNumber, name, value, bold = false) {
  return {
    row: rowNumber,
    values: ['', name, value],
    bold
  }
}

function calculateBusinessSize(employees, turnover) {
  const employeesNum = Number(employees)
  const turnoverNum = Number(turnover)

  if (employeesNum < microEmployeesNum && turnoverNum < microTurnover) { // €2m turnover
    return 'Micro'
  } else if (employeesNum < smallEmployeesNum && turnoverNum < smallTurnover) { // €10m turnover
    return 'Small'
  } else if (employeesNum < mediumEmployeesNum && turnoverNum < mediumTurnover) { // €50m turnover
    return 'Medium'
  } else {
    return 'Large'
  }
}

function addAgentDetails(agentsDetails) {
  return [
    generateRow(26, 'Agent Surname', agentsDetails?.lastName ?? ''),
    generateRow(27, 'Agent Forename', agentsDetails?.firstName ?? ''),
    generateRow(29, 'Agent Address line 1', agentsDetails?.address1 ?? ''),
    generateRow(30, 'Agent Address line 2', agentsDetails?.address2 ?? ''),
    generateRow(31, 'Agent Address line 3', ''),
    generateRow(32, 'Agent Address line 4 (town)', agentsDetails?.town ?? ''),
    generateRow(33, 'Agent Address line 5 (County)', agentsDetails?.county ?? ''),
    generateRow(34, 'Agent Postcode (use capitals)', agentsDetails?.postcode ?? ''),
    generateRow(35, 'Agent Landline number', agentsDetails?.landlineNumber ?? ''),
    generateRow(36, 'Agent Mobile number', agentsDetails?.mobileNumber ?? ''),
    generateRow(37, 'Agent Email', agentsDetails?.emailAddress ?? ''),
    generateRow(28, 'Agent Business Name', agentsDetails?.businessName ?? '')
  ]
}

function generateExcelFilename(scheme, projectName, businessName, referenceNumber, today) {
  const dateTime = new Intl.DateTimeFormat('en-GB', {
    timeStyle: 'short',
    dateStyle: 'short',
    timeZone: 'Europe/London'
  }).format(today).replace(/\//g, '-')
  return `${scheme}_${projectName}_${businessName}_${referenceNumber}_${dateTime}.xlsx`
}
function getBusinessTypeC53(businessType) {
  return `${businessType} Farmer`
}

const getPlanningPermissionDoraValue = (planningPermission) => {
  switch (planningPermission) {
    case 'Applied for but not yet approved':
      return 'Applied for'
    case 'Not yet applied for but expected to be secured before I submit my full application':
      return 'Not yet applied for'
    default:
      return 'Approved'
  }
}

function getProjectItemsFormattedArray(itemSizeQuantities, otherItems, storageType, storageCapacity, coverType, coverSize, existingCoverType, existingCoverSize, separatorOptions, concretebunkersize) {
  const projectItems = []

  // list will look like storage -> cover -> existing cover -> separator -> other items
  if (separatorOptions) {
    for (index = 0; index < separatorOptions.length; index++) {
      if (separatorOptions[index] === 'Concrete bunker') {
        projectItems.push(`${separatorOptions[index]}~${concretebunkersize}`)
        break
      } else {
        projectItems.push(`${separatorOptions[index]}~1`)
      }
    }
  } else {
    projectItems.push('')
  }

  if (otherItems[0] !== 'None of the above') {
    let unit
    Object.values(itemSizeQuantities).forEach((itemSizeQuantity, index) => {
      unit = getItemUnit(otherItems[index].toLowerCase())
      projectItems.push(`${otherItems[index]}~${itemSizeQuantity}~${unit}`)
    })
  } else {
    projectItems.push('')
  }

  if (existingCoverType) {
    projectItems.unshift(`${existingCoverType}~${existingCoverSize}`)
  } else {
    projectItems.unshift('')
  }

  if (coverType) {
    projectItems.unshift(`${coverType}~${coverSize}`)
  } else {
    projectItems.unshift('')
  }

  if (storageType) {
    projectItems.unshift(`${storageType}~${storageCapacity}`)
  } else {
    projectItems.unshift('')
  }
  return projectItems.join('|')
}

function getSpreadsheetDetails(submission) {
  const today = new Date()
  const todayStr = today.toLocaleDateString('en-GB')
  const schemeName = 'future grants Round 2'
  const subScheme = `FTF-${schemeName}`
  const {
    agentsDetails, applicantType, applyingFor, applying,
    calculatedGrant, confirmationId, concreteBunkerSize, consentOptional, coverSize, coverType,
    existingCover, existingCoverSize, existingCoverType, existingStorageCapacity,
    fitForPurpose, gridReference, intensiveFarming, itemSizeQuantities, itemsTotalValue,
    legalStatus, otherItems, plannedStorageCapacity, PlanningPermissionEvidence, planningPermission,
    projectResponsibility, projectStart, projectType, remainingCost,
    serviceCapacityIncrease, storageType, systemType, separatorOptions,
    tenancy, tenancyLength, grantFundedCover
  } = submission
  const {
    firstName, lastName, emailAddress, projectPostcode, address1,
    address2, town, county, postcode, landlineNumber, mobileNumber
  } = submission.farmerDetails
  const { projectName, sbi, businessName, businessTurnover, numberEmployees } = submission.businessDetails
  const isPigApplicant = applicantType === getQuestionAnswer('applicant-type', 'applicant-type-A1')
  const isCoverOnly = applyingFor === getQuestionAnswer('applying-for', 'applying-for-A2')
  const isFitForPurpose = fitForPurpose === getQuestionAnswer('fit-for-purpose', 'fit-for-purpose-A1')
  const hasFitForPurposeAndCover = isCoverOnly && isFitForPurpose
  return {
    filename: generateExcelFilename(
      'FTF-SIG',
      submission.businessDetails.projectName.trim(),
      submission.businessDetails.businessName.trim(),
      submission.confirmationId.trim(),
      today
    ),
    uploadLocation: `Farming Investment Fund/Farming Transformation Fund/${spreadsheetConfig.uploadEnvironment}/Slurry Infrastructure/`,
    worksheets: [
      {
        title: 'DORA DATA',
        ...(spreadsheetConfig.protectEnabled ? { protectPassword: spreadsheetConfig.protectPassword } : {}),
        hideEmptyRows: spreadsheetConfig.hideEmptyRows,
        defaultColumnWidth: 30,
        rows: [
          generateRow(1, 'Field Name', 'Field Value', true),
          generateRow(2, 'FA or OA', 'Outline Application'),
          generateRow(40, 'Scheme', 'Farming Transformation Fund'),
          generateRow(39, 'Sub scheme', subScheme),
          generateRow(43, 'Theme', 'Slurry Infrastructure Grants'),
          generateRow(90, 'Project type', 'Slurry Store and Cover'),
          generateRow(41, 'Owner', 'RD'),
          generateRow(53, 'Business type', getBusinessTypeC53(applicantType)),
          generateRow(341, 'Grant Launch Date', (new Date('2023-11-21')).toLocaleDateString('en-GB')),
          generateRow(23, 'Status of applicant', legalStatus),
          generateRow(44, 'Project Items', getProjectItemsFormattedArray(itemSizeQuantities, [otherItems].flat(), storageType, serviceCapacityIncrease, coverType, coverSize, existingCoverType, existingCoverSize, separatorOptions, concreteBunkerSize)),
          generateRow(45, 'Location of project (postcode)', projectPostcode),
          generateRow(376, 'Project Started', projectStart),
          generateRow(342, 'Land owned by Farm', tenancy),
          generateRow(343, 'Tenancy for next 5 years', tenancyLength ?? ''),
          generateRow(395, 'System Type', systemType),
          generateRow(396, 'Existing Storage Capacity', existingStorageCapacity),
          generateRow(397, 'Planned Storage Capacity', plannedStorageCapacity),
          generateRow(398, 'Slurry Storage Improvement Method', hasFitForPurposeAndCover ? 'N/A' : projectType),
          generateRow(399, 'Impermeable Cover', hasFitForPurposeAndCover ? 'N/A' : getImpermeableCover(grantFundedCover)),
          generateRow(55, 'Total project expenditure', Number(itemsTotalValue * 2)),
          generateRow(57, 'Grant rate', '50'),
          generateRow(56, 'Grant amount requested', calculatedGrant),
          generateRow(345, 'Remaining Cost to Farmer', remainingCost),
          generateRow(346, 'Planning Permission Status', isCoverOnly ? 'Not Needed' : getPlanningPermissionDoraValue(planningPermission)),
          generateRow(400, 'Planning Authority', isCoverOnly ? '' : PlanningPermissionEvidence?.planningAuthority.toUpperCase() ?? ''),
          generateRow(401, 'Planning Reference No', isCoverOnly ? '' : PlanningPermissionEvidence?.planningReferenceNumber.toUpperCase() ?? ''),
          generateRow(402, 'OS Grid Reference', gridReference.toUpperCase()),
          generateRow(366, 'Date of OA decision', ''),
          generateRow(42, 'Project name', projectName),
          generateRow(4, 'Single business identifier (SBI)', sbi || '000000000'), // sbi is '' if not set so use || instead of ??
          generateRow(7, 'Business name', businessName),
          generateRow(367, 'Annual Turnover', businessTurnover),
          generateRow(22, 'Employees', numberEmployees),
          generateRow(20, 'Business size', calculateBusinessSize(numberEmployees, businessTurnover)),
          generateRow(91, 'Are you an AGENT applying on behalf of your customer', applying === 'Agent' ? 'Yes' : 'No'),
          generateRow(5, 'Surname', lastName),
          generateRow(6, 'Forename', firstName),
          generateRow(8, 'Address line 1', address1),
          generateRow(9, 'Address line 2', address2),
          generateRow(10, 'Address line 3', ''),
          generateRow(11, 'Address line 4 (town)', town),
          generateRow(12, 'Address line 5 (county)', county),
          generateRow(13, 'Postcode (use capitals)', postcode),
          generateRow(16, 'Landline number', landlineNumber ?? ''),
          generateRow(17, 'Mobile number', mobileNumber ?? ''),
          generateRow(18, 'Email', emailAddress),
          generateRow(89, 'Customer Marketing Indicator', consentOptional ? 'Yes' : 'No'),
          generateRow(368, 'Date ready for QC or decision', todayStr),
          generateRow(369, 'Eligibility Reference No.', confirmationId),
          generateRow(94, 'Current location of file', 'NA Automated'),
          generateRow(92, 'RAG rating', 'Green'),
          generateRow(93, 'RAG date reviewed ', todayStr),
          generateRow(54, 'Electronic OA received date ', todayStr),
          generateRow(370, 'Status', 'Pending RPA review'),
          generateRow(85, 'Full Application Submission Date', (new Date('2025-06-27')).toLocaleDateString('en-GB')),
          generateRow(375, 'OA percent', 0),
          generateRow(365, 'OA score', 0),
          generateRow(463, 'Environmental permit', isPigApplicant ? intensiveFarming : 'N/A'),
          generateRow(464, 'Project Responsibility', tenancy === 'Yes' ? 'N/A' : projectResponsibility),
          generateRow(465, 'Applying for', applyingFor),
          generateRow(466, 'Fit for purpose', fitForPurpose),
          generateRow(467, 'Existing Store Cover', isCoverOnly ? 'N/A' : existingCover),
          ...addAgentDetails(agentsDetails)
        ]
      }
    ]
  }
}

function getImpermeableCover(grantFundedCover) {
  if (grantFundedCover !== 'Yes, I need a cover') {
    grantFundedCover = 'No grant funded cover selected'
  }

  return grantFundedCover
}

function getCurrencyFormat(amount) {
  return Number(amount).toLocaleString('en-US', { minimumFractionDigits: 0, style: 'currency', currency: 'GBP' })
}

const getItemUnit = (otherItem) => {
  if (otherItem.includes('pump') || otherItem.includes('slurry store')) {
    return 'item(s)'
  } else if (otherItem.includes('pipework') || otherItem.includes('channels') || otherItem.includes('below ground')) {
    return 'm'
  } else {
    return 'm³'
  }
}

function displayObject(itemSizeQuantities, otherItems) {
  let unit
  const projectItems = Object.values(itemSizeQuantities).map((itemSizeQuantity, index) => {
    unit = getItemUnit(otherItems[index].toLowerCase())
    return `${otherItems[index]}: ${itemSizeQuantity} ${unit}`
  })

  return projectItems
}

function getPersonsDetails(isAgentEmail, submission) {
  const email = isAgentEmail ? submission.agentsDetails.emailAddress : submission.farmerDetails.emailAddress
  const firstName = isAgentEmail ? submission.agentsDetails.firstName : submission.farmerDetails.firstName
  const lastName = isAgentEmail ? submission.agentsDetails.lastName : submission.farmerDetails.lastName

  return {
    email,
    firstName,
    lastName
  }
}

function getEmailDetails(submission, rpaEmail, isAgentEmail = false) {
  const {
    agentsDetails, applicantBusiness, applicantType, applyingFor, businessDetails,
    calculatedGrant, consentOptional, confirmationId, concreteBunkerSize, coverSize, coverType,
    existingCover, existingCoverSize, existingCoverType, existingStorageCapacity,
    farmerDetails: {
      emailAddress: farmerEmail,
      firstName: farmerName,
      lastName: farmerSurname,
      projectPostcode
    }, fitForPurpose, gantry, grantFundedCover, gridReference,
    inEngland, intensiveFarming, itemSizeQuantities, itemsTotalValue, legalStatus, otherItems,
    plannedStorageCapacity, PlanningPermissionEvidence, planningPermission, projectResponsibility,
    projectStart, projectType, remainingCosts, separator, separatorType, serviceCapacityIncrease,
    solidFractionStorage, storageType, systemType, tenancy, tenancyLength
  } = submission

  // Get email, firstName, and lastName based on conditions
  const {
    email,
    firstName,
    lastName
  } = getPersonsDetails(isAgentEmail, submission)
  // Determine various boolean flags
  const isPigApplicant = applicantType === getQuestionAnswer('applicant-type', 'applicant-type-A1')
  const isCoverOnly = applyingFor === getQuestionAnswer('applying-for', 'applying-for-A2')
  const newReplaceExpand = applyingFor === getQuestionAnswer('applying-for', 'applying-for-A1')
  const isFitForPurpose = fitForPurpose === getQuestionAnswer('fit-for-purpose', 'fit-for-purpose-A1')
  const isExistingCover = existingCover === getQuestionAnswer('existing-cover', 'existing-cover-A1')
  const hasFitForPurposeAndCover = isCoverOnly && isFitForPurpose
  const hasGrantFundedCover = grantFundedCover === getQuestionAnswer('grant-funded-cover', 'grant-funded-cover-A2')
  const hasAcidificationTreatment = grantFundedCover === getQuestionAnswer('grant-funded-cover', 'grant-funded-cover-A3')
  const isSeparator = separator === getQuestionAnswer('separator', 'separator-A1')
  const isConcreteBunker = solidFractionStorage === 'Concrete bunker'
  const isTenancy = tenancy === getQuestionAnswer('tenancy', 'tenancy-A1')
  const existingStoreCoverTypeOrSize = isCoverOnly && !isFitForPurpose || !isExistingCover
  const grantFundedStoreCoverTypeOrSize = hasFitForPurposeAndCover || hasGrantFundedCover || hasAcidificationTreatment
  // Create the final object with organized properties
  const result = {
    notifyTemplate: emailConfig.notifyTemplate,
    emailAddress: rpaEmail || email,
    details: {
      firstName,
      lastName,
      referenceNumber: confirmationId,
      legalStatus,
      applicantType: applicantType ? [applicantType].flat().join(', ') : ' ',
      location: inEngland,
      systemType,
      existingStorageCapacity: existingStorageCapacity,
      plannedStorageCapacity: plannedStorageCapacity,
      grantFundedCover: grantFundedCover ?? ' ',
      itemSizeQuantities: itemSizeQuantities ? displayObject(itemSizeQuantities, [otherItems].flat()).join('\n') : 'None selected',
      planningAuthority: PlanningPermissionEvidence ? PlanningPermissionEvidence.planningAuthority.toUpperCase() : 'N/A',
      planningReferenceNumber: PlanningPermissionEvidence ? PlanningPermissionEvidence.planningReferenceNumber : 'N/A',
      projectPostcode,
      projectStart: projectStart,
      tenancy: tenancy,
      isTenancyLength: tenancyLength ? 'Yes' : 'No',
      tenancyLength: tenancyLength ?? ' ',
      projectCost: getCurrencyFormat(itemsTotalValue),
      potentialFunding: getCurrencyFormat(calculatedGrant),
      remainingCost: remainingCosts,
      gridReference: gridReference.replace(/\s/g, '').toUpperCase(),
      projectName: businessDetails.projectName,
      businessName: businessDetails.businessName,
      farmerName,
      farmerSurname,
      farmerEmail,
      isAgent: agentsDetails ? 'Yes' : 'No',
      agentName: agentsDetails?.firstName ?? ' ',
      agentSurname: agentsDetails?.lastName ?? ' ',
      agentEmail: agentsDetails?.emailAddress ?? ' ',
      contactConsent: consentOptional ? 'Yes' : 'No',
      scoreDate: new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }),
      businessType: applicantBusiness,
      intensiveFarming: isPigApplicant ? intensiveFarming : '',
      intensiveFarmingTrue: isPigApplicant ? 'true' : 'false',
      projectResponsibility: !isTenancy ? projectResponsibility : '',
      projectResponsibilityTrue: !isTenancy ? 'true' : 'false',
      applyingFor: applyingFor,
      existingStoreFitForPurposeOne: isCoverOnly && fitForPurpose ? fitForPurpose : '',
      existingStoreFitForPurposeOneTrue: isCoverOnly && fitForPurpose ? 'true' : 'false',
      projectType: hasFitForPurposeAndCover ? '' : projectType,
      projectTypeTrue: hasFitForPurposeAndCover ? 'false' : 'true',
      impermeableCover: hasFitForPurposeAndCover ? '' : grantFundedCover,
      impermeableCoverTrue: hasFitForPurposeAndCover ? 'false' : 'true',
      existingStoreFitForPurposeTwo: newReplaceExpand && isExistingCover ? fitForPurpose : '',
      existingStoreFitForPurposeTwoTrue: newReplaceExpand && isExistingCover ? 'true' : 'false',
      existingStoreCover: isCoverOnly ? '' : existingCover,
      existingStoreCoverTrue: isCoverOnly ? 'false' : 'true',
      storageType: hasFitForPurposeAndCover ? '' : storageType,
      storageTypeTrue: hasFitForPurposeAndCover ? 'false' : 'true',
      estimatedVolumeToSixMonths: hasFitForPurposeAndCover || isPigApplicant ? '' : serviceCapacityIncrease,
      estimatedVolumeToSixMonthsTrue: hasFitForPurposeAndCover || isPigApplicant ? 'false' : 'true',
      estimatedVolumeToEightMonths: hasFitForPurposeAndCover || !isPigApplicant ? '' : serviceCapacityIncrease,
      estimatedVolumeToEightMonthsTrue: hasFitForPurposeAndCover || !isPigApplicant ? 'false' : 'true',
      grantFundedStoreCoverType: grantFundedStoreCoverTypeOrSize ? '' : coverType,
      grantFundedStoreCoverTypeTrue: grantFundedStoreCoverTypeOrSize ? 'false' : 'true',
      existingStoreCoverType: existingStoreCoverTypeOrSize ? '' : existingCoverType,
      existingStoreCoverTypeTrue: existingStoreCoverTypeOrSize ? 'false' : 'true',
      grantFundedCoverSize: grantFundedStoreCoverTypeOrSize ? '' : coverSize + 'm²',
      grantFundedCoverSizeTrue: grantFundedStoreCoverTypeOrSize ? 'false' : 'true',
      existingStoreCoverSize: existingStoreCoverTypeOrSize ? '' : existingCoverSize + 'm²',
      existingStoreCoverSizeTrue: existingStoreCoverTypeOrSize ? 'false' : 'true',
      slurrySeparator: isSeparator ? separator : '',
      slurrySeparatorTrue: isSeparator ? 'true' : 'false',
      separatorType: isSeparator ? separatorType : '',
      separatorTypeTrue: isSeparator ? 'true' : 'false',
      gantry: isSeparator ? gantry : '',
      gantryTrue: isSeparator ? 'true' : 'false',
      solidFractionStorage: isSeparator ? solidFractionStorage : '',
      solidFractionStorageTrue: isSeparator ? 'true' : 'false',
      concreteBunkerSize: isConcreteBunker ? concreteBunkerSize + 'm²' : '',
      concreteBunkerSizeTrue: isConcreteBunker ? 'true' : 'false',
      planningPermission: isCoverOnly ? '' : planningPermission,
      planningPermissionTrue: isCoverOnly ? 'false' : 'true'
    }
  }
  return result
}

module.exports = function (submission) {
  const { applying } = submission
  return {
    applicantEmail: getEmailDetails(submission, false),
    agentEmail: applying === 'Agent' ? getEmailDetails(submission, false, true) : null,
    rpaEmail: spreadsheetConfig.sendEmailToRpa ? getEmailDetails(submission, spreadsheetConfig.rpaEmail) : null,
    spreadsheet: getSpreadsheetDetails(submission)
  }
}
