import Page from './page'

class SystemType extends Page {
  /**
        * define elements
        */

  get slurryBased () { return $('#systemType') }
  get farmAndSlurry () { return $('#systemType-2') }
  get farmNoSlurry () { return $('#systemType-3') }
  get noSlurry () { return $('#systemType-4') }

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

  clickOnSlurrySystem () {
    const element = $('#systemType')
    browser.execute('arguments[0].click();', element)
  }

  clickOnFarmAndSlurry () {
    const element = $('#systemType-2')
    browser.execute('arguments[0].click();', element)
  }

  clickOnFarmNoSlurry () {
    const element = $('#systemType-3')
    browser.execute('arguments[0].click();', element)
  }

  clickOnNoSlurry () {
    const element = $('#systemType-4')
    browser.execute('arguments[0].click();', element)
  }
}
export default new SystemType()
