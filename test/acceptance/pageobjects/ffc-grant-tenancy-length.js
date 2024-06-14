import Page from './page'

class TenancyLength extends Page {
  /**
        * define elements
        */

  get yesTenancyLength () { return $('#tenancyLength') }
  get noTenancyLength () { return $('#tenancyLength-2') }

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

  clickOnYesTenancyLength () {
    const element = $('#tenancyLength')
    browser.execute('arguments[0].click();', element)
  }

  clickOnNoTenancyLength () {
    const element = $('#tenancyLength-2')
    browser.execute('arguments[1].click();', element)
  }
}
export default new TenancyLength()
