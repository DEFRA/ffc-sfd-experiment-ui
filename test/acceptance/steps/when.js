import clearInputField from '../support/action/clearInputField'
import clickElement from '../support/action/clickElement'
import closeLastOpenedWindow from '../support/action/closeLastOpenedWindow'
import deleteCookies from '../support/action/deleteCookies'
import dragElement from '../support/action/dragElement'
import focusLastOpenedWindow from '../support/action/focusLastOpenedWindow'
import handleModal from '../support/action/handleModal'
import moveTo from '../support/action/moveTo'
import pause from '../support/action/pause'
import pressButton from '../support/action/pressButton'
import scroll from '../support/action/scroll'
import selectOption from '../support/action/selectOption'
import selectOptionByIndex from '../support/action/selectOptionByIndex'
import setCookie from '../support/action/setCookie'
import setInputField from '../support/action/setInputField'
import setPromptText from '../support/action/setPromptText'

import ApplicantType from '../pageobjects/ffc-grant-applicanttype'
import LegalStatus from '../pageobjects/ffc-grant-legal-status'
import Country from '../pageobjects/ffc-grant-country'
import ProjectStarted from '../pageobjects/ffc-grant-project-started'
import Tenancy from '../pageobjects/ffc-grant-tenancy'
import TenancyLength from '../pageobjects/ffc-grant-tenancy-length'
import SystemType from '../pageobjects/ffc-grant-system-type'

const { When } = require('cucumber')

When(
  /^I (click|doubleclick) on the (link|button|element) "([^"]*)?"$/,
  clickElement
)

When(
  /^I (add|set) "([^"]*)?" to the inputfield "([^"]*)?"$/,
  setInputField
)

When(
  /^I clear the inputfield "([^"]*)?"$/,
  clearInputField
)

When(
  /^I drag element "([^"]*)?" to element "([^"]*)?"$/,
  dragElement
)

When(
  /^I pause for (\d+)ms$/,
  pause
)

When(
  /^I set a cookie "([^"]*)?" with the content "([^"]*)?"$/,
  setCookie
)

When(
  /^I delete the cookie "([^"]*)?"$/,
  deleteCookies
)

When(
  /^I press "([^"]*)?"$/,
  pressButton
)

When(
  /^I (accept|dismiss) the (alertbox|confirmbox|prompt)$/,
  handleModal
)

When(
  /^I enter "([^"]*)?" into the prompt$/,
  setPromptText
)

When(
  /^I scroll to element "([^"]*)?"$/,
  scroll
)

When(
  /^I close the last opened (window|tab)$/,
  closeLastOpenedWindow
)

When(
  /^I focus the last opened (window|tab)$/,
  focusLastOpenedWindow
)

When(
  /^I select the (\d+)(st|nd|rd|th) option for element "([^"]*)?"$/,
  selectOptionByIndex
)

When(
  /^I select the option with the (name|value|text) "([^"]*)?" for element "([^"]*)?"$/,
  selectOption
)

When(
  /^I move to element "([^"]*)?"(?: with an offset of (\d+),(\d+))*$/,
  moveTo
)

When(/^I clicks on the button$/, function () {
  ApplicantType.clickOnPigApplicantType()
})

When(/^I clicks on the "([^"]*)?"button$/, function (applicant) {
  if (applicant === 'Pig') {
    ApplicantType.clickOnPigApplicantType()
  } else if (applicant === 'Beef') {
    ApplicantType.clickOnBeef()
  } else if (applicant === 'Dairy') {
    ApplicantType.clickOnDairy()
  } else if (applicant === 'NoneOfTheAbove') {
    ApplicantType.clickOnNoneOfTheAbove()
  }
})

When(/^I click on Continue button$/, async () => {
  ApplicantType.clickOnSaveandContinueButton2()
})

When(/^I clicks on the sole trade button$/, function () {
  LegalStatus.clickOnSoleTrade()
})

When(/^I clicks on the "([^"]*)?" button$/, function (trades) {
  if (trades === 'sole') {
    LegalStatus.clickOnSoleTrade()
    console.log(trades)
  } else if (trades === 'partnership') {
    LegalStatus.clickOnPartnership()
  } else if (trades === 'limitedCompany') {
    LegalStatus.clickOnLimitedCompany()
  } else if (trades === 'charity') {
    LegalStatus.clickOnCharity()
  } else if (trades === 'trust') {
    LegalStatus.clickOnTrust()
  } else if (trades === 'liaPartnership') {
    LegalStatus.clickOnLimitedLiabilityPartnership()
  } else if (trades === 'communityInt') {
    LegalStatus.clickOnCommunityInterestCompany()
  } else if (trades === 'ltdPartnership') {
    LegalStatus.clickOnLimitedLiabilityPartnership()
  } else if (trades === 'industrialSty') {
    LegalStatus.clickOnIndustrialAndProvidentSociety()
  } else if (trades === 'coopSociety') {
    LegalStatus.clickOnCooperativeSociety()
  } else if (trades === 'BenCom') {
    LegalStatus.clickOnCommunityBenefitSociety()
  } else if (trades === 'NoneOfTheAbove') {
    LegalStatus.clickOnNoneOfTheAbove()
  }
})

When(/^I click on the limited company button$/, function () {
  LegalStatus.clickOnLimitedCompany()
})

When(/^I click on CountryYes button$/, function () {
  Country.clickOnCtyYesButton()
})

When(/^I click on CountryNo button$/, function () {
  Country.clickOnCtyNoButton()
})

When(/^I click on Yes preparatory work button$/, function () {
  ProjectStarted.clickOnYesPrepWork()
})

When(/^I click "([^"]*)?" button$/, function (preparatoryWork) {
  if (preparatoryWork === 'yesPrepWork') {
    ProjectStarted.clickOnYesPrepWork()
    console.log(preparatoryWork)
  } else if (preparatoryWork === 'noWorkDoneYet') {
    ProjectStarted.clickOnNoProjectYet()
  }
})

When(/^I click on yes land ownership button$/, function () {
  Tenancy.clickOnYesLandOwnership()
})

When(/^I click on yes land ownership button$/, function () {
  TenancyLength.clickOnYesTenancyLength()
})

When(/^I click on slurry based system button$/, function () {
  SystemType.clickOnSlurrySystem()
})
