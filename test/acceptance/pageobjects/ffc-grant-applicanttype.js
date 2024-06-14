import Page from './page'

class ApplicantType extends Page {
  /**
      * define elements
      */

  get cropApplicantType () { return $('input#applicantType.govuk-radios__input') }
  get saveAndContinueButton () { return $('.govuk-button') }
  // get saveAndContinueBut () { return $('//form/button') }
  get saveAndContinueBut () { return $('#Continue') }
  get savAndContinueBut () { return $('button.govuk-button::before') }

  // css=form &gt; button.govuk-button    xpath=
  // And I click on Continue button
  /**
       * define or overwrite page methods
       */
  open () {
    super.open('')
    browser.pause(3000)
  }
  /**
       * your page specific methods
       */

  clickOnPigApplicantType () {
    const element = $('input#applicantType.govuk-radios__input')
    browser.execute('arguments[0].click();', element)
  }

  clickOnBeef () {
    const element = $('input#applicantType-2.govuk-radios__input')
    browser.execute('arguments[0].click();', element)
  }

  clickOnDairy () {
    const element = $('input#applicantType-3.govuk-radios__input')
    browser.execute('arguments[0].click();', element)
  }

  clickOnNoneOfTheAbove () {
    const element = $('#applicantType-5.govuk-radios__input')
    browser.execute('arguments[0].click();', element)
  }

  clickOnSaveandContinueButton () {
    // this.saveAndContinueButton().click()
    // this.saveAndContinueBut().click()
    this.savAndContinueBut().click()
  }

  async clickOnSaveandContinueButton2 () {
    await (await this.saveAndContinueBut).click()
  }
}
export default new ApplicantType()
