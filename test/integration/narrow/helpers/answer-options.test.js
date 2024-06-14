jest.mock('../../../../app/helpers/reference-grant-amounts-array')
const { formatAnswerArray } = require('../../../../app/helpers/reference-grant-amounts-array')

const { getQuestionAnswer } = require('../../../../app/helpers/utils.js')
jest.mock('../../../../app/helpers/utils.js')

const { getYarValue } = require('../../../../app/helpers/session')
jest.mock('../../../../app/helpers/session')

const { getOptions, setOptionsLabel } = require('../../../../app/helpers/answer-options')

describe('answer-options', () => {
  test('check getOptions()', () => {
    formatAnswerArray.mockImplementation((a, b, c, d) => (['answer-1', 'answer-2']))

    let question = {
      costDataType: 'cost-data-type',
      answers: [],
      yarKey: 'mock-yarKey',
      type: 'input',
      classes: 'mock-classes',
      hint: 'mock-hint',
      id: 'mock-id',
      label: 'mock-label',
      prefix: 'mock-prefix',
      suffix: 'mock-suffix',
      value: 'mock-value'
    }
    expect(getOptions(undefined, question, 'cond-html', {})).toEqual({
      classes: 'mock-classes',
      hint: 'mock-hint',
      id: 'mock-yarKey',
      name: 'mock-yarKey',
      label: 'mock-label',
      prefix: 'mock-prefix',
      suffix: 'mock-suffix',
      value: ''
    })

    question = {
      ...question,
      type: 'email'
    }
    expect(getOptions(undefined, question, 'cond-html', {})).toEqual({
      classes: 'mock-classes',
      hint: 'mock-hint',
      id: 'mock-yarKey',
      name: 'mock-yarKey',
      label: 'mock-label',
      prefix: 'mock-prefix',
      suffix: 'mock-suffix',
      value: ''
    })

    question = {
      ...question,
      type: 'tel'
    }
    expect(getOptions(undefined, question, 'cond-html', {})).toEqual({
      classes: 'mock-classes',
      hint: 'mock-hint',
      id: 'mock-yarKey',
      name: 'mock-yarKey',
      label: 'mock-label',
      prefix: 'mock-prefix',
      suffix: 'mock-suffix',
      value: ''
    })

    question = {
      ...question,
      type: 'multi-input',
      allFields: [
        {
          yarKey: 'mock-yarkey',
          type: 'switch-default',
          answers: [{ value: 'value', hint: 'hint', text: 'text', conditional: 'conditional' }]
        }
      ]
    }
    const data = { 'mock-yarkey': 'mock-value' }
    expect(getOptions(data, question, 'cond-html', {})).toEqual([
      {
        classes: 'govuk-fieldset__legend--l',
        endFieldset: undefined,
        fieldset: {
          legend: {
            classes: 'govuk-fieldset__legend--l',
            isPageHeading: true,
            text: undefined
          }
        },
        hint: undefined,
        id: 'mock-yarkey',
        items: [
          { checked: false, conditional: 'conditional', hint: 'hint', selected: false, text: 'text', value: 'value' }
        ],
        name: 'mock-yarkey',
        type: 'switch-default'
      }
    ])
    expect(getOptions(undefined, question, 'cond-html', {})).toEqual([
      {
        classes: 'govuk-fieldset__legend--l',
        endFieldset: undefined,
        fieldset: {
          legend: {
            classes: 'govuk-fieldset__legend--l',
            isPageHeading: true,
            text: undefined
          }
        },
        hint: undefined,
        id: 'mock-yarkey',
        items: [
          { checked: false, conditional: 'conditional', hint: 'hint', selected: false, text: 'text', value: 'value' }
        ],
        name: 'mock-yarkey',
        type: 'switch-default'
      }
    ])

    question = {
      ...question,
      type: 'select'
    }
    expect(getOptions(undefined, question, 'cond-html', {})).toEqual({
      classes: 'mock-classes',
      hint: 'mock-hint',
      id: 'mock-yarKey',
      name: 'mock-yarKey',
      label: 'mock-label',
      items: [
        {
          text: 'Select an option',
          value: ''
        },
        {
          selected: false,
          text: 'answer-1',
          value: 'answer-1'
        },
        {
          selected: false,
          text: 'answer-2',
          value: 'answer-2'
        },
        {
          selected: false,
          text: 'answer-1',
          value: 'answer-1'
        },
        {
          selected: false,
          text: 'answer-2',
          value: 'answer-2'
        }
      ]
    })

    const { classes, ...questionWithoutClasses } = question
    expect(getOptions(undefined, questionWithoutClasses, 'cond-html', {})).toEqual({
      classes: 'govuk-fieldset__legend--l',
      hint: 'mock-hint',
      id: 'mock-yarKey',
      name: 'mock-yarKey',
      label: 'mock-label',
      items: [
        {
          text: 'Select an option',
          value: ''
        },
        {
          selected: false,
          text: 'answer-1',
          value: 'answer-1'
        },
        {
          selected: false,
          text: 'answer-2',
          value: 'answer-2'
        },
        {
          selected: false,
          text: 'answer-1',
          value: 'answer-1'
        },
        {
          selected: false,
          text: 'answer-2',
          value: 'answer-2'
        }
      ]
    })

    question = {
      ...question,
      type: 'select-default'
    }
    expect(getOptions(undefined, question, 'cond-html', {})).toEqual(
      {
        classes: 'mock-classes',
        fieldset: {
          legend: {
            classes: 'mock-classes',
            isPageHeading: true,
            text: undefined
          }
        },
        hint: 'mock-hint',
        id: 'mock-yarKey',
        items: [
          {
            checked: false,
            hint: undefined,
            selected: true,
            text: undefined,
            value: undefined
          },
          {
            checked: false,
            hint: undefined,
            selected: true,
            text: undefined,
            value: undefined
          },
          {
            checked: false,
            hint: undefined,
            selected: true,
            text: undefined,
            value: undefined
          },
          {
            checked: false,
            hint: undefined,
            selected: true,
            text: undefined,
            value: undefined
          }
        ],
        name: 'mock-yarKey'
      }
    )
  })

  test('check storage-type getOptions()', () => {
    formatAnswerArray.mockImplementation((a, b, c, d) => (['answer-1', 'answer-2']))

    let question = {
      costDataType: 'cost-data-type',
      answers: [],
      yarKey: 'mock-yarKey',
      type: 'input',
      classes: 'mock-classes',
      hint: 'mock-hint',
      id: 'mock-id',
      label: 'mock-label',
      prefix: 'mock-prefix',
      suffix: 'mock-suffix',
      value: 'mock-value',
      key: 'storage-type'
    }
    expect(getOptions(undefined, question, 'cond-html', {})).toEqual({
      classes: 'mock-classes',
      hint: 'mock-hint',
      id: 'mock-yarKey',
      name: 'mock-yarKey',
      label: 'mock-label',
      prefix: 'mock-prefix',
      suffix: 'mock-suffix',
      value: ''

    })

    question = {
      ...question,
      type: 'email'
    }
    expect(getOptions(undefined, question, 'cond-html', {})).toEqual({
      classes: 'mock-classes',
      hint: 'mock-hint',
      id: 'mock-yarKey',
      name: 'mock-yarKey',
      label: 'mock-label',
      prefix: 'mock-prefix',
      suffix: 'mock-suffix',
      value: ''

    })

    question = {
      ...question,
      type: 'tel'
    }
    expect(getOptions(undefined, question, 'cond-html', {})).toEqual({
      classes: 'mock-classes',
      hint: 'mock-hint',
      id: 'mock-yarKey',
      name: 'mock-yarKey',
      label: 'mock-label',
      prefix: 'mock-prefix',
      suffix: 'mock-suffix',
      value: ''

    })

    question = {
      ...question,
      type: 'multi-input',
      allFields: [
        {
          yarKey: 'mock-yarkey',
          type: 'switch-default',
          answers: [{ value: 'value', hint: 'hint', text: 'text', conditional: 'conditional' }]
        }
      ]
    }
    const data = { 'mock-yarkey': 'mock-value' }
    expect(getOptions(data, question, 'cond-html', {})).toEqual([
      {
        classes: 'govuk-fieldset__legend--l',
        endFieldset: undefined,
        fieldset: {
          legend: {
            classes: 'govuk-fieldset__legend--l',
            isPageHeading: true,
            text: undefined
          }
        },
        hint: undefined,
        id: 'mock-yarkey',
        items: [
          { checked: false, conditional: 'conditional', hint: 'hint', selected: false, text: 'text', value: 'value' }
        ],
        name: 'mock-yarkey',
        type: 'switch-default'
      }
    ])
    expect(getOptions(undefined, question, 'cond-html', {})).toEqual([
      {
        classes: 'govuk-fieldset__legend--l',
        endFieldset: undefined,
        fieldset: {
          legend: {
            classes: 'govuk-fieldset__legend--l',
            isPageHeading: true,
            text: undefined
          }
        },
        hint: undefined,
        id: 'mock-yarkey',
        items: [
          { checked: false, conditional: 'conditional', hint: 'hint', selected: false, text: 'text', value: 'value' }
        ],
        name: 'mock-yarkey',
        type: 'switch-default'

      }
    ])

    question = {
      ...question,
      type: 'select'
    }
    expect(getOptions(undefined, question, 'cond-html', {})).toEqual({
      classes: 'mock-classes',
      hint: 'mock-hint',
      id: 'mock-yarKey',
      name: 'mock-yarKey',
      label: 'mock-label',
      items: [
        {
          text: 'Select an option',
          value: ''
        },
        {
          selected: false,
          text: 'answer-1',
          value: 'answer-1'
        },
        {
          selected: false,
          text: 'answer-2',
          value: 'answer-2'
        },
        {
          selected: false,
          text: 'answer-1',
          value: 'answer-1'
        },
        {
          selected: false,
          text: 'answer-2',
          value: 'answer-2'
        }
      ]
    })

    const { classes, ...questionWithoutClasses } = question
    expect(getOptions(undefined, questionWithoutClasses, 'cond-html', {})).toEqual({
      classes: 'govuk-fieldset__legend--l',
      hint: 'mock-hint',
      id: 'mock-yarKey',
      name: 'mock-yarKey',
      label: 'mock-label',
      items: [
        {
          text: 'Select an option',
          value: ''
        },
        {
          selected: false,
          text: 'answer-1',
          value: 'answer-1'
        },
        {
          selected: false,
          text: 'answer-2',
          value: 'answer-2'
        },
        {
          selected: false,
          text: 'answer-1',
          value: 'answer-1'
        },
        {
          selected: false,
          text: 'answer-2',
          value: 'answer-2'
        }
      ]
    })

    question = {
      ...question,
      type: 'select-default'
    }
    expect(getOptions(undefined, question, 'cond-html', {})).toEqual(
      {
        classes: 'mock-classes',
        fieldset: {
          legend: {
            classes: 'mock-classes',
            isPageHeading: true,
            text: undefined
          }
        },
        hint: 'mock-hint',
        id: 'mock-yarKey',
        items: [
          {
            checked: false,
            hint: undefined,
            selected: true,
            text: undefined,
            value: undefined
          },
          {
            checked: false,
            hint: undefined,
            selected: true,
            text: undefined,
            value: undefined
          },
          {
            checked: false,
            hint: undefined,
            selected: true,
            text: undefined,
            value: undefined
          },
          {
            checked: false,
            hint: undefined,
            selected: true,
            text: undefined,
            value: undefined
          }
        ],
        name: 'mock-yarKey'
      }
    )
  })

  test('check other-items getOptions() - No Inspection', () => {
    formatAnswerArray.mockImplementation((a, b, c, d) => ([{ value: 'answer1' }], [{ value: 'Safety fencing' }], [{ value: 'Inspection platform' }]))

    getQuestionAnswer.mockImplementation((a, b) => (true))

    getYarValue.mockImplementation((a, b) => (false))

    let question = {
      costDataType: 'cost-data-type',
      answers: [],
      yarKey: 'mock-yarKey',
      type: 'input',
      classes: 'mock-classes',
      hint: 'mock-hint',
      id: 'mock-id',
      label: 'mock-label',
      prefix: 'mock-prefix',
      suffix: 'mock-suffix',
      value: 'mock-value',
      key: 'other-items'
    }
    expect(getOptions(undefined, question, 'cond-html', {})).toEqual({
      classes: 'mock-classes',
      hint: 'mock-hint',
      id: 'mock-yarKey',
      name: 'mock-yarKey',
      label: 'mock-label',
      prefix: 'mock-prefix',
      suffix: 'mock-suffix',
      value: ''

    })

    question = {
      ...question,
      type: 'email'
    }
    expect(getOptions(undefined, question, 'cond-html', {})).toEqual({
      classes: 'mock-classes',
      hint: 'mock-hint',
      id: 'mock-yarKey',
      name: 'mock-yarKey',
      label: 'mock-label',
      prefix: 'mock-prefix',
      suffix: 'mock-suffix',
      value: ''

    })

    question = {
      ...question,
      type: 'tel'
    }
    expect(getOptions(undefined, question, 'cond-html', {})).toEqual({
      classes: 'mock-classes',
      hint: 'mock-hint',
      id: 'mock-yarKey',
      name: 'mock-yarKey',
      label: 'mock-label',
      prefix: 'mock-prefix',
      suffix: 'mock-suffix',
      value: ''

    })

    question = {
      ...question,
      type: 'multi-input',
      allFields: [
        {
          yarKey: 'mock-yarkey',
          type: 'switch-default',
          answers: [{ value: 'value', hint: 'hint', text: 'text', conditional: 'conditional' }]
        }
      ]
    }
    const data = { 'mock-yarkey': 'mock-value' }
    expect(getOptions(data, question, 'cond-html', {})).toEqual([
      {
        classes: 'govuk-fieldset__legend--l',
        endFieldset: undefined,
        fieldset: {
          legend: {
            classes: 'govuk-fieldset__legend--l',
            isPageHeading: true,
            text: undefined
          }
        },
        hint: undefined,
        id: 'mock-yarkey',
        items: [
          { checked: false, conditional: 'conditional', hint: 'hint', selected: false, text: 'text', value: 'value' }
        ],
        name: 'mock-yarkey',
        type: 'switch-default'
      }
    ])
    expect(getOptions(undefined, question, 'cond-html', {})).toEqual([
      {
        classes: 'govuk-fieldset__legend--l',
        endFieldset: undefined,
        fieldset: {
          legend: {
            classes: 'govuk-fieldset__legend--l',
            isPageHeading: true,
            text: undefined
          }
        },
        hint: undefined,
        id: 'mock-yarkey',
        items: [
          { checked: false, conditional: 'conditional', hint: 'hint', selected: false, text: 'text', value: 'value' }
        ],
        name: 'mock-yarkey',
        type: 'switch-default'

      }
    ])

    question = {
      ...question,
      type: 'select'
    }
    expect(getOptions(undefined, question, 'cond-html', {})).toEqual({
      classes: 'mock-classes',
      hint: 'mock-hint',
      id: 'mock-yarKey',
      name: 'mock-yarKey',
      label: 'mock-label',
      items: [
        {
          text: 'Select an option',
          value: ''
        },
        {
          selected: false,
          text: {
            value: 'divider'
          },
          value: {
            value: 'divider'
          }
        },
        {
          selected: false,
          text: {
            key: 'other-items-A15',
            value: 'None of the above',
            redirectUrl: 'project-summary'
          },
          value: {
            key: 'other-items-A15',
            value: 'None of the above',
            redirectUrl: 'project-summary'
          }
        }

      ]
    })

    const { classes, ...questionWithoutClasses } = question
    expect(getOptions(undefined, questionWithoutClasses, 'cond-html', {})).toEqual({
      classes: 'govuk-fieldset__legend--l',
      hint: 'mock-hint',
      id: 'mock-yarKey',
      name: 'mock-yarKey',
      label: 'mock-label',
      items: [
        {
          text: 'Select an option',
          value: ''
        },
        {
          selected: false,
          text: {
            value: 'divider'
          },
          value: {
            value: 'divider'
          }
        },
        {
          selected: false,
          text: {
            key: 'other-items-A15',
            value: 'None of the above',
            redirectUrl: 'project-summary'
          },
          value: {
            key: 'other-items-A15',
            value: 'None of the above',
            redirectUrl: 'project-summary'
          }
        }
      ]
    })

    question = {
      ...question,
      type: 'select-default'
    }
    expect(getOptions(undefined, question, 'cond-html', {})).toEqual(
      {
        classes: 'mock-classes',
        fieldset: {
          legend: {
            classes: 'mock-classes',
            isPageHeading: true,
            text: undefined
          }
        },
        hint: 'mock-hint',
        id: 'mock-yarKey',
        items: [
          {
            divider: 'or'
          },
          {
            checked: false,
            hint: undefined,
            selected: false,
            text: 'None of the above',
            value: 'None of the above'
          }
        ],
        name: 'mock-yarKey'
      }
    )
  })

  test('check other-items getOptions() - No Safety', () => {
    formatAnswerArray.mockImplementation((a, b, c, d) => ([{ value: 'answer1' }], [{ value: 'Safety fencing' }]))

    getQuestionAnswer.mockImplementation((a, b) => (null))

    getYarValue.mockImplementation((a, b) => (null))

    let question = {
      costDataType: 'cost-data-type',
      answers: [],
      yarKey: 'mock-yarKey',
      type: 'input',
      classes: 'mock-classes',
      hint: 'mock-hint',
      id: 'mock-id',
      label: 'mock-label',
      prefix: 'mock-prefix',
      suffix: 'mock-suffix',
      value: 'mock-value',
      key: 'other-items'
    }
    expect(getOptions(undefined, question, 'cond-html', {})).toEqual({
      classes: 'mock-classes',
      hint: 'mock-hint',
      id: 'mock-yarKey',
      name: 'mock-yarKey',
      label: 'mock-label',
      prefix: 'mock-prefix',
      suffix: 'mock-suffix',
      value: ''

    })

    question = {
      ...question,
      type: 'email'
    }
    expect(getOptions(undefined, question, 'cond-html', {})).toEqual({
      classes: 'mock-classes',
      hint: 'mock-hint',
      id: 'mock-yarKey',
      name: 'mock-yarKey',
      label: 'mock-label',
      prefix: 'mock-prefix',
      suffix: 'mock-suffix',
      value: ''

    })

    question = {
      ...question,
      type: 'tel'
    }
    expect(getOptions(undefined, question, 'cond-html', {})).toEqual({
      classes: 'mock-classes',
      hint: 'mock-hint',
      id: 'mock-yarKey',
      name: 'mock-yarKey',
      label: 'mock-label',
      prefix: 'mock-prefix',
      suffix: 'mock-suffix',
      value: ''

    })

    question = {
      ...question,
      type: 'multi-input',
      allFields: [
        {
          yarKey: 'mock-yarkey',
          type: 'switch-default',
          answers: [{ value: 'value', hint: 'hint', text: 'text', conditional: 'conditional' }]
        }
      ]
    }
    const data = { 'mock-yarkey': 'mock-value' }
    expect(getOptions(data, question, 'cond-html', {})).toEqual([
      {
        classes: 'govuk-fieldset__legend--l',
        endFieldset: undefined,
        fieldset: {
          legend: {
            classes: 'govuk-fieldset__legend--l',
            isPageHeading: true,
            text: undefined
          }
        },
        hint: undefined,
        id: 'mock-yarkey',
        items: [
          { checked: false, conditional: 'conditional', hint: 'hint', selected: false, text: 'text', value: 'value' }
        ],
        name: 'mock-yarkey',
        type: 'switch-default'
      }
    ])
    expect(getOptions(undefined, question, 'cond-html', {})).toEqual([
      {
        classes: 'govuk-fieldset__legend--l',
        endFieldset: undefined,
        fieldset: {
          legend: {
            classes: 'govuk-fieldset__legend--l',
            isPageHeading: true,
            text: undefined
          }
        },
        hint: undefined,
        id: 'mock-yarkey',
        items: [
          { checked: false, conditional: 'conditional', hint: 'hint', selected: false, text: 'text', value: 'value' }
        ],
        name: 'mock-yarkey',
        type: 'switch-default'

      }
    ])

    question = {
      ...question,
      type: 'select'
    }
    expect(getOptions(undefined, question, 'cond-html', {})).toEqual({
      classes: 'mock-classes',
      hint: 'mock-hint',
      id: 'mock-yarKey',
      name: 'mock-yarKey',
      label: 'mock-label',
      items: [
        {
          text: 'Select an option',
          value: ''
        },
        {
          selected: false,
          text: {
            value: 'divider'
          },
          value: {
            value: 'divider'
          }
        },
        {
          selected: false,
          text: {
            key: 'other-items-A15',
            value: 'None of the above',
            redirectUrl: 'project-summary'
          },
          value: {
            key: 'other-items-A15',
            value: 'None of the above',
            redirectUrl: 'project-summary'
          }
        }

      ]
    })

    const { classes, ...questionWithoutClasses } = question
    expect(getOptions(undefined, questionWithoutClasses, 'cond-html', {})).toEqual({
      classes: 'govuk-fieldset__legend--l',
      hint: 'mock-hint',
      id: 'mock-yarKey',
      name: 'mock-yarKey',
      label: 'mock-label',
      items: [
        {
          text: 'Select an option',
          value: ''
        },
        {
          selected: false,
          text: {
            value: 'divider'
          },
          value: {
            value: 'divider'
          }
        },
        {
          selected: false,
          text: {
            key: 'other-items-A15',
            value: 'None of the above',
            redirectUrl: 'project-summary'
          },
          value: {
            key: 'other-items-A15',
            value: 'None of the above',
            redirectUrl: 'project-summary'
          }
        }
      ]
    })

    question = {
      ...question,
      type: 'select-default'
    }
    expect(getOptions(undefined, question, 'cond-html', {})).toEqual(
      {
        classes: 'mock-classes',
        fieldset: {
          legend: {
            classes: 'mock-classes',
            isPageHeading: true,
            text: undefined
          }
        },
        hint: 'mock-hint',
        id: 'mock-yarKey',
        items: [
          {
            divider: 'or'
          },
          {
            checked: false,
            hint: undefined,
            selected: false,
            text: 'None of the above',
            value: 'None of the above'
          }
        ],
        name: 'mock-yarKey'
      }
    )
  })

  test('check other-items getOptions() - Normal', () => {
    formatAnswerArray.mockImplementation((a, b, c, d) => ([{ value: 'answer1' }], [{ value: 'Safety fencing' }]))

    getQuestionAnswer.mockImplementation((a, b) => (true))

    let question = {
      costDataType: 'cost-data-type',
      answers: [],
      yarKey: 'mock-yarKey',
      type: 'input',
      classes: 'mock-classes',
      hint: 'mock-hint',
      id: 'mock-id',
      label: 'mock-label',
      prefix: 'mock-prefix',
      suffix: 'mock-suffix',
      value: 'mock-value',
      key: 'other-items'
    }
    expect(getOptions(undefined, question, 'cond-html', {})).toEqual({
      classes: 'mock-classes',
      hint: 'mock-hint',
      id: 'mock-yarKey',
      name: 'mock-yarKey',
      label: 'mock-label',
      prefix: 'mock-prefix',
      suffix: 'mock-suffix',
      value: ''

    })

    question = {
      ...question,
      type: 'email'
    }
    expect(getOptions(undefined, question, 'cond-html', {})).toEqual({
      classes: 'mock-classes',
      hint: 'mock-hint',
      id: 'mock-yarKey',
      name: 'mock-yarKey',
      label: 'mock-label',
      prefix: 'mock-prefix',
      suffix: 'mock-suffix',
      value: ''

    })

    question = {
      ...question,
      type: 'tel'
    }
    expect(getOptions(undefined, question, 'cond-html', {})).toEqual({
      classes: 'mock-classes',
      hint: 'mock-hint',
      id: 'mock-yarKey',
      name: 'mock-yarKey',
      label: 'mock-label',
      prefix: 'mock-prefix',
      suffix: 'mock-suffix',
      value: ''

    })

    question = {
      ...question,
      type: 'multi-input',
      allFields: [
        {
          yarKey: 'mock-yarkey',
          type: 'switch-default',
          answers: [{ value: 'value', hint: 'hint', text: 'text', conditional: 'conditional' }]
        }
      ]
    }
    const data = { 'mock-yarkey': 'mock-value' }
    expect(getOptions(data, question, 'cond-html', {})).toEqual([
      {
        classes: 'govuk-fieldset__legend--l',
        endFieldset: undefined,
        fieldset: {
          legend: {
            classes: 'govuk-fieldset__legend--l',
            isPageHeading: true,
            text: undefined
          }
        },
        hint: undefined,
        id: 'mock-yarkey',
        items: [
          { checked: false, conditional: 'conditional', hint: 'hint', selected: false, text: 'text', value: 'value' }
        ],
        name: 'mock-yarkey',
        type: 'switch-default'
      }
    ])
    expect(getOptions(undefined, question, 'cond-html', {})).toEqual([
      {
        classes: 'govuk-fieldset__legend--l',
        endFieldset: undefined,
        fieldset: {
          legend: {
            classes: 'govuk-fieldset__legend--l',
            isPageHeading: true,
            text: undefined
          }
        },
        hint: undefined,
        id: 'mock-yarkey',
        items: [
          { checked: false, conditional: 'conditional', hint: 'hint', selected: false, text: 'text', value: 'value' }
        ],
        name: 'mock-yarkey',
        type: 'switch-default'

      }
    ])

    question = {
      ...question,
      type: 'select'
    }
    expect(getOptions(undefined, question, 'cond-html', {})).toEqual({
      classes: 'mock-classes',
      hint: 'mock-hint',
      id: 'mock-yarKey',
      name: 'mock-yarKey',
      label: 'mock-label',
      items: [
        {
          text: 'Select an option',
          value: ''
        },
        {
          selected: false,
          text: {
            value: 'Safety fencing'
          },
          value: {
            value: 'Safety fencing'
          }
        },
        {
          selected: false,
          text: {
            value: 'divider'
          },
          value: {
            value: 'divider'
          }
        },
        {
          selected: false,
          text: {
            key: 'other-items-A15',
            value: 'None of the above',
            redirectUrl: 'project-summary'
          },
          value: {
            key: 'other-items-A15',
            value: 'None of the above',
            redirectUrl: 'project-summary'
          }
        }

      ]
    })

    const { classes, ...questionWithoutClasses } = question
    expect(getOptions(undefined, questionWithoutClasses, 'cond-html', {})).toEqual({
      classes: 'govuk-fieldset__legend--l',
      hint: 'mock-hint',
      id: 'mock-yarKey',
      name: 'mock-yarKey',
      label: 'mock-label',
      items: [
        {
          text: 'Select an option',
          value: ''
        },
        {
          selected: false,
          text: {
            value: 'Safety fencing'
          },
          value: {
            value: 'Safety fencing'
          }
        },
        {
          selected: false,
          text: {
            value: 'divider'
          },
          value: {
            value: 'divider'
          }
        },
        {
          selected: false,
          text: {
            key: 'other-items-A15',
            value: 'None of the above',
            redirectUrl: 'project-summary'
          },
          value: {
            key: 'other-items-A15',
            value: 'None of the above',
            redirectUrl: 'project-summary'
          }
        }
      ]
    })

    question = {
      ...question,
      type: 'select-default'
    }
    expect(getOptions(undefined, question, 'cond-html', {})).toEqual(
      {
        classes: 'mock-classes',
        fieldset: {
          legend: {
            classes: 'mock-classes',
            isPageHeading: true,
            text: undefined
          }
        },
        hint: 'mock-hint',
        id: 'mock-yarKey',
        items: [
          {
            checked: false,
            hint: undefined,
            selected: false,
            text: 'Safety fencing',
            value: 'Safety fencing'
          },
          {
            divider: 'or'
          },
          {
            checked: false,
            hint: undefined,
            selected: false,
            text: 'None of the above',
            value: 'None of the above'
          }
        ],
        name: 'mock-yarKey'
      }
    )
  })

  test('check setOptionsLabel()', () => {
    const answers = [
      { value: 'divider' },
      { value: 'mock-data', hint: 'mock-hint' },
      { value: 'another-mock-data', hint: 'mock-hint', conditional: 'mock-cond' },
      { value: 'another-mock-data', hint: 'mock-hint', conditional: 'mock-cond', text: 'mock-text' }
    ]
    expect(setOptionsLabel('mock-data', answers, 'cond-html')).toEqual([
      { divider: 'or' },
      {
        value: 'mock-data',
        text: 'mock-data',
        hint: 'mock-hint',
        checked: true,
        selected: true
      },
      {
        value: 'another-mock-data',
        text: 'another-mock-data',
        conditional: { html: 'cond-html' },
        hint: 'mock-hint',
        checked: false,
        selected: false
      },
      {
        value: 'another-mock-data',
        text: 'mock-text',
        conditional: 'mock-cond',
        hint: 'mock-hint',
        checked: false,
        selected: false
      }
    ])
  })
})
