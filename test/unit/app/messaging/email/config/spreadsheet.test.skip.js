
describe('spreadsheet.js', () => {
  const value = require('./../../../../../../app/messaging/config/spreadsheet')

  const OLD_ENV = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...OLD_ENV }
  })

  afterAll(() => {
    process.env = OLD_ENV
  })

  xtest('check spreadsheet config', () => {
    const {
      WORKSHEET_HIDE_EMPTY_ROWS,
      WORKSHEET_PROTECT_ENABLED,
      SEND_EMAIL_TO_RPA,
      WORKSHEET_PROTECT_PASSWORD,
      RPA_EMAIL_ADDRESS,
      EXCEL_UPLOAD_ENVIRONMENT
    } = process.env

    expect(value).toEqual({
      hideEmptyRows: WORKSHEET_HIDE_EMPTY_ROWS === 'true',
      protectEnabled: WORKSHEET_PROTECT_ENABLED === 'true',
      sendEmailToRpa: SEND_EMAIL_TO_RPA === 'true',
      protectPassword: WORKSHEET_PROTECT_PASSWORD,
      rpaEmail: RPA_EMAIL_ADDRESS,
      uploadEnvironment: EXCEL_UPLOAD_ENVIRONMENT
    })
  })

  test('Invalid env var throws error', () => {
    process.env.WORKSHEET_HIDE_EMPTY_ROWS = 'hello',
    process.env.WORKSHEET_PROTECT_ENABLED = 'hello',
    process.env.SEND_EMAIL_TO_RPA = 'hello',
    process.env.WORKSHEET_PROTECT_PASSWORD = 857,
    process.env.RPA_EMAIL_ADDRESS = 756,
    process.env.EXCEL_UPLOAD_ENVIRONMENT = 7546

    expect(() => require('./../../../../../../app/messaging/config/spreadsheet')).toThrow()
  })
})
