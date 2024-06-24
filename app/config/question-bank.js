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
          preQuestionContent: ['Check your land details', 'Before you continue with this application, check that the registered land \ndetails on your digital maps are up to date. If they are not, this may prevent you\nfrom applying for the SFI actions you select.\n' +
          '\n' +
          'You need to check your digital maps show:\n' +
          '• all the land parcels you want to include in this application\n' +
          '• the correct total area (in hectares) for each land parcel\n' +
          '• the correct land covers for each land parcel, for example, arable land,\n permanent grassland, permanent crops or relevant non-agricultural land cover\n' +
          '\n' +
          '<a href="https://magic.defra.gov.uk/magicmap.aspx">Check your digital maps</a>'],
          journeyStart: true,
          title: 'Do your digital maps show the correct land details?',
          backUrl: 'portal',
          nextUrl: 'management-control',
          classes: 'govuk-radios--stacked govuk-fieldset__legend--m',
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
          preQuestionContent: ['Management control of land', 'You must have management control of the land in your agreement. This must\nlast for the duration of your selected actions.\nIf you occupy land under a tenancy that\'s due to expire before the duration of\nthe actions you want to select, you can still apply. But only if you expect the\ntenancy to continue to cover the duration of these actions.\n\nRead the guidance on <a href="https://www.gov.uk/guidance/rules-for-farmers-and-land-managers#manage-land-that-you-own-or-occupy">management control of land</a>.'],
          title: 'Will you have management control of the land in your \n' +
            'application for the duration of the actions you want to\n' +
            'select?',
          backUrl: 'land-details-confirmation',
          nextUrl: 'historic-features',
          classes: 'govuk-radios--stacked govuk-fieldset__legend--m',
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
          preQuestionContent: ['Land with historic or archaeological features', 'If you apply for SFI actions on land with historic or archaeological features,\nyou must get an Historic Farm Environment Record (HEFER)\nfrom Historic England.\n\nYou must do this before you do your selected SFI actions on this land.\n\nRead the guidance on <a href="https://www.gov.uk/countryside-stewardship-grants/management-of-historic-and-archaeological-features-on-grassland-hs5">land with historic or archaeological features</a> to find out\nwhat a HEFER is and how to request one.\n\nIf you are not applying for SFI actions on land with historic or archaeological\nfeatures, answer \'yes\' to continue your application.'],
          title: 'Will you get a HEFER if you need to?' ,
          classes: 'govuk-radios--stacked govuk-fieldset__legend--m',
          url: 'historic-features',
          backUrl: 'management-control',
          nextUrl: 'sssi-consent',
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
          key: 'sssi-consent',
          preQuestionContent: ['SSSI consent', 'If you apply for SFI actions on land that\'s a site of special scientific interest\n(SSSI), you must get SSSI consent from Natural England.\n\nYou need to get this consent before you do your selected SFI actions on SSSI\nland. Some actions can be done without SSSI consent - this is set out in each\naction in the <a href="https://www.gov.uk/find-funding-for-land-or-farms">\'find funding for land ot farms\' tool</a>\n\nRead the guidance on <a href="https://www.gov.uk/government/publications/request-permission-for-works-or-an-activity-on-an-sssi#:~:text=As%20the%20owner%20or%20occupier,a%20planned%20activity%20on%20it">SSSI consent</a>.\n\nIf you are not applying for actions on SSSI land, or the actions can be done\nwithout SSSI consent, answer \'yes\' to continue your application.'],
          title: 'Will you get SSSI consent if you need to?' ,
          classes: 'govuk-radios--stacked govuk-fieldset__legend--m',
          url: 'sssi-consent',
          backUrl: 'historic-features',
          nextUrl: 'inheritance-tax',
          type: 'boolean',
          label: {
            text: 'How many {{_livestockType_}} do you have?',
            classes: 'govuk-label--l',
            isPageHeading: true
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select yes to confirm you will get a SSSI consent if needed'
            }
          ],
          answers: [
            {
              key: 'sssi-consent-A1',
              value: 'Yes'
            },
            {
              key: 'sssi-consent-A2',
              value: 'No',
              notEligible: true
            }
          ],
          yarKey: 'sssiConsent'
        },
        {
          key: 'inheritance-tax',
          preQuestionContent: ['Land that\'s conditionally exempt from inheritance tax', 'You need to check you can do your selected SFI actions on land that is either:\n• conditionally exempt from inheritance tax\n• the object of a maintenance fund\n\nRead the <a href="https://www.gov.uk/inheritance-tax">inheritance tax exemption guidance</a>.'],
          title: 'Are the actions you want to apply for available on land that\'s conditionally exempt from inheritance tax, or the object of a maintenance fund?' ,
          classes: 'govuk-radios--stacked govuk-fieldset__legend--m',
          url: 'inheritance-tax',
          backUrl: 'sssi-consent',
          nextUrl: 'public-bodies',
          type: 'boolean',
          label: {
            text: 'How many {{_livestockType_}} do you have?',
            classes: 'govuk-label--l',
            isPageHeading: true
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select yes to confirm you are exempt from inheritance tax'
            }
          ],
          answers: [
            {
              key: 'inheritance-tax-A1',
              value: 'Yes'
            },
            {
              key: 'inheritance-tax-A2',
              value: 'No',
              notEligible: true
            }
          ],
          yarKey: 'inheritance-tax'
        },
        {
          key: 'public-bodies',
          preQuestionContent: ['Public bodies','If you\'re a public body, you can apply for an SFI agreement. But you will not be\npaid for activities you\'re required to carry out as part of your statutory duties.\nYou will not be paid for activities that are already funded by other sources\neither.\n\nRead the guidance about the <a href="https://www.gov.uk/government/publications/adding-value-grant-for-farmers-to-improve-crops-or-livestock/about-the-adding-value-grant-who-can-apply-and-what-the-grant-can-pay-for">eligibility of public bodies</a>. \n\nIf you\'re not a public body, or you\'re not a tenant on land owned by a public\nbody, answer \'yes\' to continue your application.'],
          title: 'Do the actions you want to apply for fall outside of your statutory duties, and can you confirm they are not already funded by other sources?' ,
          classes: 'govuk-radios--stacked govuk-fieldset__legend--m',
          url: 'public-bodies',
          backUrl: 'inheritance-tax',
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
              error: 'Select yes to confirm you are not a public body'
            }
          ],
          answers: [
            {
              key: 'public-bodies-A1',
              value: 'Yes'
            },
            {
              key: 'public-bodies-A2',
              value: 'No',
              notEligible: true
            }
          ],
          yarKey: 'public-bodies'
        },
        {
          key: 'eligibility-confirmation',
          preQuestionContent: ['You are eligible to apply'],
          title: 'You are eligible',
          url: 'eligibility-confirmation',
          backUrl: 'public-bodies',
          nextUrl: '/tech-evaluation/choose-land-parcel',
          answers: [],
          showSidebar: true,
          sidebar: [
            'You are eligible to apply'
          ],
          secButtonHref: '/choose-land-parcel'
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
