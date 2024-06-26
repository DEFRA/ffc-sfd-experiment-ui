describe('Conditional html', () => {
  const { getHtml } = require('../../../../app/helpers/conditionalHTML')

  test('check function getHtml - concrete bunker -  no errors', () => {
    const label = 'concreteBunkerSize'
    const labelData = 'MOCK_LABEL_DATA'
    const fieldValueData = 'MOCK_FIELD_VALUE_DATA'
    const error = false

    const result = getHtml(label, labelData, fieldValueData, error)
    expect(result).not.toContain('<div class="govuk-form-group govuk-form-group--error">')
  })

  test('check function getHtml - concrete bunker -  no errors, empty fieldValueData', () => {
    const label = 'concreteBunkerSize'
    const labelData = 'MOCK_LABEL_DATA'
    const fieldValueData = ''
    const error = false

    const result = getHtml(label, labelData, fieldValueData, error)
    expect(result).not.toContain('<div class="govuk-form-group govuk-form-group--error">')
  })

  test('check function getHtml - concrete bunker -  with errors', () => {
    const label = 'concreteBunkerSize'
    const labelData = 'MOCK_LABEL_DATA'
    const fieldValueData = 'MOCK_FIELD_VALUE_DATA'
    const error = 'Some error message'

    const result = getHtml(label, labelData, fieldValueData, error)
    expect(result).toContain('<div class="govuk-form-group govuk-form-group--error">')
    expect(result).toContain('Error:')
    expect(result).toContain('Some error message')
  })

  test('check function getHtml - not concrete bunker -  no errors', () => {
    const label = 'not_concreteBunkerSize'
    const labelData = 'MOCK_LABEL_DATA'
    const fieldValueData = 'MOCK_FIELD_VALUE_DATA'
    const error = false

    const result = getHtml(label, labelData, fieldValueData, error)
    expect(result).not.toContain('<div class="govuk-form-group--error">')
  })

  test('check function getHtml - not concrete bunker -  with errors', () => {
    const label = 'not_concreteBunkerSize'
    const labelData = 'MOCK_LABEL_DATA'
    const fieldValueData = 'MOCK_FIELD_VALUE_DATA'
    const error = true

    const result = getHtml(label, labelData, fieldValueData, error)
    expect(result).toContain('<div class="govuk-form-group--error">')
    expect(result).toContain('<span id="post-code-error" class="govuk-error-message">')
    expect(result).toContain('Error:')
    expect(result).toContain('<input class="govuk-input govuk-!-width-one-third govuk-input--error"')
  })
})
