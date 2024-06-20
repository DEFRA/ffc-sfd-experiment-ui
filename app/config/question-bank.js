const {
  CHARS_MIN_10,
  POSTCODE_REGEX,
  WHOLE_NUMBER_REGEX,
  SBI_REGEX,
  NAME_ONLY_REGEX,
  PHONE_REGEX,
  EMAIL_REGEX,
  ONLY_TEXT_REGEX,
  PLANNING_REFERENCE_NUMBER_REGEX,
  LETTERS_AND_NUMBERS_REGEX,
  TWO_LETTERS_TEN_DIGITS,
  CHARS_MAX_50,
  INTERGERS_AND_DECIMALS
} = require('../helpers/regex')
/**
 * ----------------------------------------------------------------
 * list of yarKeys not bound to an answer, calculated separately
 * -  calculatedGrant
 * -  remainingCost
 *
 * Mainly to replace the value of a previously stored input
 * Format: {{_VALUE_}}
 * eg: question.title: 'Can you pay £{{_storedYarKey_}}'
 * ----------------------------------------------------------------
 */
/**
 * ----------------------------------------------------------------
 * question type = single-answer, boolean ,input, multiinput, mullti-answer
 *
 *
 * ----------------------------------------------------------------
 */
/**
 * multi-input validation schema
 *
 *  type: 'multi-input',
    allFields: [
      {
        ...
        validate: [
          {
            type: 'NOT_EMPTY',
            error: 'Error message'
          },
          {
            type: 'REGEX',
            error: 'Error message',
            regex: SAVED_REGEX
          },
          {
            type: 'MIN_MAX',
            error: 'Error message',
            min: MINIMUM,
            max: MAXIMUM
          }
        ]
      }
    ]
 */
const questionBank = {
  grantScheme: {
    grantID: 'a01WT00001tGtA2YAK',
    schemeName: 'AHG',
    subScheme: {
      subSchemeId: 'AHG74',
      subSchemeDisplayName: 'Animal Housing Grant'
    }
  },
  themes: [
    {
      name: 'productivity',
      title: 'Productivity',
      questions: [
        {
          key: 'maps-correct',
          journeyStart: true,
          title: 'Do your digital maps show the correct land details?',
          backUrl: 'portal',
          nextUrl: 'management-control',
          classes: 'govuk-radios--inline govuk-fieldset__legend--l',
          url: 'land-details-confirmation',
          ineligibleContent: {
            messageContent:
              'Please update your land details via the RLE1 form.'
          },
          type: 'boolean',
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select yes if your maps show the correct land details'
            }
          ],
          answers: [
            {
              key: 'maps-correct-A1',
              value: 'Yes'
            },
            {
              key: 'maps-correct-A2',
              value: 'No',
              notEligible: true
            }
          ],
          yarKey: 'mapsCorrect'
        },
        {
          key: 'management-control',
          title: 'Management control of land',
          backUrl: 'land-details-confirmation',
          nextUrl: 'historic-features',
          url: 'management-control',
          type: 'boolean',
          ineligibleContent: {
            messageContent:
              'You are not eligible if you do not have management control of the land.'
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select yes if you have management control of your land'
            }
          ],
          answers: [
            {
              key: 'management-control-A1',
              value: 'Yes'
            },
            {
              key: 'management-control-A2',
              value: 'No',
              notEligible: true
            }
          ],
          yarKey: 'managementControl'
        },
        {
          key: 'hefer-confirmation',
          title: 'Land with historic or archaeological features',
          classes: 'govuk-input--width-10',
          url: 'historic-features',
          backUrl: 'management-control',
          nextUrl: 'eligibility-confirmation',
          type: 'boolean',
          label: {
            text: 'How many {{_livestockType_}} do you have?',
            classes: 'govuk-label--l',
            isPageHeading: true
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select yes to confirm you will get a HEFER if needed'
            }
          ],
          answers: [
            {
              key: 'hefer-confirmation-A1',
              value: 'Yes'
            },
            {
              key: 'hefer-confirmation-A2',
              value: 'No',
              notEligible: true
            }
          ],
          yarKey: 'heferConfirmation'
        },
        {
          key: 'eligibility-confirmation',
          title: 'You are eligible',
          url: 'eligibility-confirmation',
          backUrl: 'hefer-confirmation',
          nextUrl: 'confirmation',
          answers: [],
          showSidebar: true,
          sidebar: [
            'You are eligible to apply'
          ],
          secButtonHref: '/select-land-parcel'
        }
      ]
    }
  ]
}

const equipmentGrant = {
  grantScheme: {
    grantID: 'FFC002',
    schemeName: 'FIF',
    subScheme: {
      subSchemeId: 'Fhs74',
      subSchemeDisplayName: 'Farming equipment and technology fund'
    }
  },
  themes: [
    {
      name: 'productivity',
      title: 'Productivity',
      questions: [
        {
          key: 'project-location',
          journeyStart: true,
          title: 'Is your project in England?',
          backUrl: 'portal',
          nextUrl: 'select-equipment',
          classes: 'govuk-radios--inline govuk-fieldset__legend--l',
          url: 'project-location',
          ineligibleContent: {
            messageContent:
              'This grant is only for projects registered in England.'
          },
          type: 'boolean',
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select yes if the project is in England'
            }
          ],
          answers: [
            {
              key: 'project-location-true',
              value: 'Yes'
            },
            {
              key: 'project-location-false',
              value: 'No',
              notEligible: true
            }
          ],
          yarKey: 'projectLocation'
        },
        {
          key: 'select-list',
          title: 'Select equipment',
          url: 'select-equipment',
          backUrl: 'project-location',
          nextUrl: 'project-postcode',
          type: 'item-list',
          grantInfo: {
            minGrant: 2000,
            maxGrant: 25000
          },
          sidebar: [
            'Note that the minimum grant value is {{_minGrant_}} and the maximum grant value is {{_maxGrant_}}. You can apply for a total of £50,000 over multiple rounds.'
          ],
          itemList: [
            {
              equipmentId: 2001,
              equipmentName: 'Electronic tray filling machine',
              shortName: 'FETF1',
              description:
                'Electronic tray filling machine. To be eligible machine must be able to fill polystyrene trays, plug trays, shuttle trays and pots in trays. Machine must be able to fill 500 trays per hour. Machine must be capable of varying filling density to achieve optimal compaction for different seeding requirements. Must be capable of handling 600mm x 400mm trays. While the machine can be used as a standalone tray filler, to allow for future expansion the tray filler must be capable of being used with a conveyor belt system to allow incorporation into a fully automated seeding line or transplanting line.',
              referenceValue: '5938',
              score: '60'
            },
            {
              equipmentId: 2003,
              equipmentName: 'Five row seeder',
              shortName: 'FETF3',
              description:
                'Manual push seeder which can sow a minimum of 5 rows. It must have soil openers at the front and roller(s) at the rear, and changeable seed wheels/rollers for different crops and spacing. Maximum 2 per application.',
              referenceValue: '16079',
              score: '46',
              quantityLimit: 2
            }
          ],
          validate: [
            {
              type: 'REGEX',
              regex: 'WHOLE_NUMBER_REGEX',
              error: 'Enter a whole number for the item quantities'
            },
            {
              type: 'QUANTITY',
              error: 'Some items are over their maximum allowance'
            }
          ],
          answers: [],
          yarKey: 'equipmentList'
        },
        {
          key: 'project-postcode',
          classes: 'govuk-input--width-10',
          url: 'project-postcode',
          backUrl: 'select-equipment',
          nextUrl: 'check-details',
          type: 'input',
          hint: {
            html: `<p>Enter the postcode of the main location where the items will be located<p/>`
          },
          label: {
            text: 'What is the project postcode?',
            classes: 'govuk-label--l',
            isPageHeading: true
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Enter the projects postcode'
            },
            {
              type: 'REGEX',
              regex: 'POSTCODE_REGEX',
              error: 'Enter a project postcode, like AA1 1AA'
            }
          ],
          answers: [],
          yarKey: 'projectPostcode'
        },
        {
          key: 'check-details',
          title: 'Check application details and submit',
          url: 'check-details',
          backUrl: 'project-postcode',
          nextUrl: 'confirmation',
          summarySections: [
            {
              title: 'Equipment selections',
              type: 'items',
              changeUrl: 'select-equipment',
              yarKey: 'equipmentList'
            },
            {
              title: 'Equipment location',
              type: 'simple',
              rows: [
                {
                  title: 'Postcode',
                  yarKey: 'projectPostcode',
                  changeUrl: 'project-postcode'
                }
              ]
            }
          ],
          sidebar: [
            'Note that the minimum grant value is £2,000 and the maximum grant value is £25,000.',
            'You can apply for a total of £50,000 over multiple rounds'
          ],
          answers: []
        },
        {
          key: 'reference-number',
          title: 'Details submitted',
          url: 'confirmation',
          answers: []
        }
      ]
    }
  ]
}
const ALL_QUESTIONS = []
questionBank.themes.forEach(({ questions }) => {
  ALL_QUESTIONS.push(...questions)
})
const ALL_URLS = []
ALL_QUESTIONS.forEach(item => ALL_URLS.push(item.url))
const YAR_KEYS = [
  'itemsTotalValue',
  'remainingCost',
  'calculatedGrant',
  'separatorOptions',
  'concreteBunkerSize',
  'cappedAmount'
]
ALL_QUESTIONS.forEach(item => YAR_KEYS.push(item.yarKey))
module.exports = {
  questionBank,  
  equipmentGrant,
  ALL_QUESTIONS,
  YAR_KEYS,
  ALL_URLS
}
