const questions = [
  {
    yarKey: 'projectLocation',
    validate: [
      {
        type: 'NOT_EMPTY',
        regex: null,
        error: 'Select yes if the project is in England.'
      }
    ],
    url: 'project-location',
    type: 'boolean',
    title: 'Is your project in England?',
    summarySections: [],
    sidebar: null,
    nextUrl: 'livestock-type',
    label: null,
    key: 'project-location',
    journeyStart: true,
    itemList: null,
    ineligibleContent: {
      messageContent:
        'This grant is only for projects registered in England. You need to select Yes!!!'
    },
    hint: null,
    grantInfo: null,
    classes: 'govuk-radios--inline govuk-fieldset__legend--l',
    backUrl: 'portal',
    answers: [
      { value: 'Yes', notEligible: false, key: 'project-location-A1' },
      { value: 'No', notEligible: true, key: 'project-location-A2' }
    ]
  },
  {
    yarKey: 'livestockType',
    validate: [],
    url: 'livestock-type',
    type: 'single-answer',
    title: 'What livestock do you have?',
    summarySections: [],
    sidebar: null,
    nextUrl: 'livestock-quantity',
    label: null,
    key: 'livestock-type',
    journeyStart: null,
    itemList: null,
    ineligibleContent: { messageContent: null },
    hint: null,
    grantInfo: null,
    classes: 'govuk-label--l',
    backUrl: 'project-location',
    answers: [
      { value: 'Beef Cattle', notEligible: false, key: 'livestock-type-A1' },
      { value: 'Dairy Cattle', notEligible: false, key: 'livestock-type-A2' },
      { value: 'Sheep', notEligible: false, key: 'livestock-type-A3' },
      { value: 'Pigs', notEligible: false, key: 'livestock-type-A4' },
      { value: 'Test', notEligible: false, key: 'livestock-type-A5' }
    ]
  },
  {
    yarKey: 'livestockQuantity',
    validate: [
      {
        type: 'NOT_EMPTY',
        regex: null,
        error: 'Enter the total number of livestock.'
      }
    ],
    url: 'livestock-quantity',
    type: 'input',
    title: null,
    summarySections: [],
    sidebar: null,
    nextUrl: 'project-amount',
    label: {
      text: 'How many {{_livestockType_}} do you have?',
      isPageHeading: true,
      classes: 'govuk-label--l'
    },
    key: 'livestock-quantity',
    journeyStart: null,
    itemList: null,
    ineligibleContent: { messageContent: null },
    hint: null,
    grantInfo: null,
    classes: 'govuk-input--width-10',
    backUrl: 'livestock-type',
    answers: []
  },
  {
    yarKey: 'projectAmount',
    validate: [
      { type: 'NOT_EMPTY', regex: null, error: 'Enter the project amount.' }
    ],
    url: 'project-amount',
    type: 'input',
    title: null,
    summarySections: [],
    sidebar: [
      'Note that the minimum grant value is £2,000 and the maximum grant value is £25,000.',
      'You can apply for a total of £50,000 over multiple rounds.'
    ],
    nextUrl: 'check-details',
    label: {
      text: 'What is the total grant amount you are applying for?',
      isPageHeading: true,
      classes: 'govuk-label--l'
    },
    key: 'project-amount',
    journeyStart: null,
    itemList: null,
    ineligibleContent: { messageContent: null },
    hint: {
      html: '<p><span style="color: rgb(23, 43, 77); font-size: 14px;">Please enter the amount for your project.</span></p>'
    },
    grantInfo: null,
    classes: 'govuk-label--l',
    backUrl: 'livestock-quantity',
    answers: []
  },
  {
    yarKey: 'checkDetails',
    validate: null,
    url: 'check-details',
    type: null,
    title: 'Check application details and submit',
    summarySections: [
      {
        yarKey: null,
        type: 'simple',
        title: 'Answers',
        rows: [
          {
            yarKey: 'projectLocation',
            title: 'Is your project in England?',
            changeUrl: 'project-location'
          },
          {
            yarKey: 'livestockType',
            title: 'What livestock do you have?',
            changeUrl: 'livestock-type'
          },
          {
            yarKey: 'livestockQuantity',
            title: 'How many {{_livestockType_}} do you have?',
            changeUrl: 'livestock-quantity'
          },
          {
            yarKey: 'projectAmount',
            title: 'What is the total grant amount you are applying for?',
            changeUrl: 'project-amount'
          }
        ],
        changeUrl: null
      }
    ],
    sidebar: null,
    nextUrl: 'confirmation',
    label: null,
    key: 'check-details',
    journeyStart: null,
    itemList: null,
    ineligibleContent: null,
    hint: null,
    grantInfo: null,
    classes: null,
    backUrl: 'project-amount',
    answers: null
  },
  {
    yarKey: 'referenceNumber',
    validate: null,
    url: 'confirmation',
    type: null,
    title: 'Details submitted',
    summarySections: [],
    sidebar: null,
    nextUrl: null,
    label: null,
    key: 'reference-number',
    journeyStart: null,
    itemList: null,
    ineligibleContent: null,
    hint: null,
    grantInfo: null,
    classes: null,
    backUrl: null,
    answers: null
  }
]

module.exports = {
  questions
}
