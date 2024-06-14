const { WHOLE_NUMBER_REGEX, INTERGERS_AND_DECIMALS } = require('../../../../app/helpers/regex')
const { formatOtherItems } = require('./../../../../app/helpers/other-items-sizes')

const objectToSend = {
  data: {
    grantScheme: {
      key: 'SLURRY01',
      name: 'Slurry Infrastructure Grant'
    },
    desirability: {
      catagories: [{
        key: 'cat-storage',
        title: 'Storage',
        items: [
          {
            item: 'Above-ground steel slurry store',
            amount: 22,
            unit: 'per cubic metre'
          },
          {
            item: 'Precast circular concrete slurry store',
            amount: 17,
            unit: 'per cubic metre'
          },
          {
            item: 'In-situ cast-reinforced concrete slurry store',
            amount: 15,
            unit: 'per cubic metre'
          },
          {
            item: 'Earth-bank lagoon with consolidated clay lining',
            amount: 8,
            unit: 'per cubic metre'
          },
          {
            item: 'Earth-bank lagoon with internal liner',
            amount: 12,
            unit: 'per cubic metre'
          },
          {
            item: 'Stores using pre-cast rectangular concrete panels',
            amount: 14,
            unit: 'per cubic metre'
          },
          {
            item: 'Large-volume supported slurry bag (over 2,500 cubic metres)',
            amount: 20,
            unit: 'per cubic metre'
          }
        ]
      },
      {
        key: 'cat-cover-type',
        title: 'Cover type',
        items: [
          {
            item: 'Rigid cover for steel or concrete slurry stores',
            amount: 8,
            unit: 'per square metre'
          },
          {
            item: 'Fixed flexible cover',
            amount: 4,
            unit: 'per square metre'
          },
          {
            item: 'Floating flexible cover',
            amount: 3,
            unit: 'per square metre'
          }
        ]
      },
      {
        key: 'cat-reception-pit-type',
        title: 'Reception pit type',
        items: [
          {
            item: 'Reception pit',
            amount: 30,
            unit: 'per cubic metre'
          }
        ]
      },
      {
        key: 'cat-pump-type',
        title: 'Pump type',
        items: [
          {
            item: 'Electric-powered slurry transfer pump',
            amount: 1050,
            unit: 'per pump'
          },
          {
            item: 'Powered take off (PTO) or hydraulically powered slurry transfer pump',
            amount: 2090,
            unit: 'per pump'
          },
          {
            item: 'Centrifugal chopper pump',
            amount: 950,
            unit: 'per pump'
          },
          {
            item: 'Powered take off (PTO) or hydraulically driven chopper pump',
            amount: 1700,
            unit: 'per pump'
          }
        ]
      },
      {
        key: 'cat-pipework',
        title: 'Pipework',
        items: [
          {
            item: 'Galvanised steel pipework 100mm diameter',
            amount: 14,
            unit: 'per metre'
          },
          {
            item: 'Galvanised steel pipework 150mm diameter',
            amount: 24,
            unit: 'per metre'
          },
          {
            item: 'Polyethylene (PE) or equivalent pipework 100mm diameter',
            amount: 8,
            unit: 'per metre'
          },
          {
            item: 'Polyethylene (PE) or equivalent pipework 150mm diameter',
            amount: 9,
            unit: 'per metre'
          }
        ]
      },
      {
        key: 'cat-transfer-channels',
        title: 'Transfer channels',
        items: [
          {
            item: 'Under-floor transfer channels',
            amount: 25,
            unit: 'per metre'
          }
        ]
      },
      {
        key: 'cat-agitator',
        title: 'Agitator',
        items: [
          {
            item: 'Slurry store wall mixers with store capacity up to 1,200 cubic metre',
            amount: 350,
            unit: 'per tank'
          },
          {
            item: 'Slurry store wall mixers with store capacity up to 8,000 cubic metre',
            amount: 1000,
            unit: 'per tank'
          }
        ]
      },
      {
        key: 'cat-safety-equipment',
        title: 'Safety equipment',
        items: [
          {
            item: 'Inspection platform with ladder for above-ground concrete and steel slurry store',
            amount: 800,
            unit: 'per item'
          },
          {
            item: 'Safety fencing for stores constructed below gorund leve, earth-bank lagoons and slurry bags',
            amount: 55,
            unit: 'per metre'
          }
        ]
      }],
      overallRating: {
        score: null,
        band: null
      }
    }
  }

}

const itemsList = [
  'Reception pit',
  'Electric-powered slurry transfer pump',
  'Powered take off (PTO) or hydraulically powered slurry transfer pump',
  'Centrifugal chopper pump',
  'Powered take off (PTO) or hydraulically driven chopper pump',
  'Galvanised steel pipework 100mm diameter',
  'Galvanised steel pipework 150mm diameter',
  'Polyethylene (PE) or equivalent pipework 100mm diameter',
  'Polyethylene (PE) or equivalent pipework 150mm diameter',
  'Under-floor transfer channels',
  'Slurry store wall mixers with store capacity up to 1,200 cubic metre',
  'Slurry store wall mixers with store capacity up to 8,000 cubic metre',
  'Inspection platform with ladder for above-ground concrete and steel slurry store',
  'Safety fencing for stores constructed below gorund leve, earth-bank lagoons and slurry bags'
]

describe('Other Items Sizes Array Function', () => {
  test('Should return array correctly when object sent', () => {
    const mockRequest = {
      yar: {
        get: (key) => {
          if (key === 'referenceCostObject') {
            return objectToSend
          } else {
            return itemsList
          }
        }
      }
    }

    const response = formatOtherItems(mockRequest)

    expect(response).toEqual([
      {
        yarKey: 'Receptionpit',
        type: 'text',
        pattern: '[0-9]*',
        inputmode: 'numeric',
        suffix: { text: 'm³' },
        hint: {
          text: 'Grant amount: £30 per cubic metre'
        },
        classes: 'govuk-input--width-3',
        label: {
          html: '<span class=\"govuk-visually-hidden\">How many per cubic metre of this item will be required: </span>Reception pit',
          classes: 'govuk-label--m'
        },
        validate: [
          {
            type: 'NOT_EMPTY',
            error: 'Enter reception pit volume'
          },
          {
            type: 'REGEX',
            regex: INTERGERS_AND_DECIMALS,
            error: 'Volume must only include numbers'
          },
          {
            type: 'INCLUDES',
            checkArray: ['.'],
            error: 'Volume must be a whole number'
          },
          {
            type: 'MIN_MAX',
            min: 1,
            max: 9999,
            error: 'Volume must be between 1-9999'
          }
        ]
      },
      {
        yarKey: 'Electricpoweredslurrytransferpump',
        type: 'text',
        pattern: '[0-9]*',
        inputmode: 'numeric',
        suffix: { text: 'item(s)' },
        hint: {
          text: 'Grant amount: £1,050 per pump'
        },
        classes: 'govuk-input--width-3',
        label: {
          html: '<span class=\"govuk-visually-hidden\">How many per pump of this item will be required: </span>Electric-powered slurry transfer pump',
          classes: 'govuk-label--m'
        },
        validate: [
          {
            type: 'NOT_EMPTY',
            error: 'Enter pump quantity'
          },
          {
            type: 'REGEX',
            regex: INTERGERS_AND_DECIMALS,
            error: 'Quantity must only include numbers'
          },
          {
            type: 'INCLUDES',
            checkArray: ['.'],
            error: 'Quantity must be a whole number'
          },
          {
            type: 'MIN_MAX',
            min: 1,
            max: 9999,
            error: 'Quantity must be between 1-9999'
          }
        ]
      },
      {
        yarKey: 'PoweredtakeoffPTOorhydraulicallypoweredslurrytransferpump',
        type: 'text',
        pattern: '[0-9]*',
        inputmode: 'numeric',
        suffix: { text: 'item(s)' },
        hint: {
          text: 'Grant amount: £2,090 per pump'
        },
        classes: 'govuk-input--width-3',
        label: {
          html: '<span class=\"govuk-visually-hidden\">How many per pump of this item will be required: </span>Powered take off (PTO) or hydraulically powered slurry transfer pump',
          classes: 'govuk-label--m'
        },
        validate: [
          {
            type: 'NOT_EMPTY',
            error: 'Enter pump quantity'
          },
          {
            type: 'REGEX',
            regex: INTERGERS_AND_DECIMALS,
            error: 'Quantity must only include numbers'
          },
          {
            type: 'INCLUDES',
            checkArray: ['.'],
            error: 'Quantity must be a whole number'
          },
          {
            type: 'MIN_MAX',
            min: 1,
            max: 9999,
            error: 'Quantity must be between 1-9999'
          }
        ]
      },
      {
        yarKey: 'Centrifugalchopperpump',
        type: 'text',
        pattern: '[0-9]*',
        inputmode: 'numeric',
        suffix: { text: 'item(s)' },
        hint: {
          text: 'Grant amount: £950 per pump'
        },
        classes: 'govuk-input--width-3',
        label: {
          html: '<span class=\"govuk-visually-hidden\">How many per pump of this item will be required: </span>Centrifugal chopper pump',
          classes: 'govuk-label--m'
        },
        validate: [
          {
            type: 'NOT_EMPTY',
            error: 'Enter pump quantity'
          },
          {
            type: 'REGEX',
            regex: INTERGERS_AND_DECIMALS,
            error: 'Quantity must only include numbers'
          },
          {
            type: 'INCLUDES',
            checkArray: ['.'],
            error: 'Quantity must be a whole number'
          },
          {
            type: 'MIN_MAX',
            min: 1,
            max: 9999,
            error: 'Quantity must be between 1-9999'
          }
        ]
      },
      {
        yarKey: 'PoweredtakeoffPTOorhydraulicallydrivenchopperpump',
        type: 'text',
        pattern: '[0-9]*',
        inputmode: 'numeric',
        suffix: { text: 'item(s)' },
        hint: {
          text: 'Grant amount: £1,700 per pump'
        },
        classes: 'govuk-input--width-3',
        label: {
          html: '<span class=\"govuk-visually-hidden\">How many per pump of this item will be required: </span>Powered take off (PTO) or hydraulically driven chopper pump',
          classes: 'govuk-label--m'
        },
        validate: [
          {
            type: 'NOT_EMPTY',
            error: 'Enter pump quantity'
          },
          {
            type: 'REGEX',
            regex: INTERGERS_AND_DECIMALS,
            error: 'Quantity must only include numbers'
          },
          {
            type: 'INCLUDES',
            checkArray: ['.'],
            error: 'Quantity must be a whole number'
          },
          {
            type: 'MIN_MAX',
            min: 1,
            max: 9999,
            error: 'Quantity must be between 1-9999'
          }
        ]
      },
      {
        yarKey: 'Galvanisedsteelpipework100mmdiameter',
        type: 'text',
        pattern: '[0-9]*',
        inputmode: 'numeric',
        suffix: { text: 'metre(s)' },
        hint: {
          text: 'Grant amount: £14 per metre'
        },
        classes: 'govuk-input--width-3',
        label: {
          html: '<span class=\"govuk-visually-hidden\">How many per metre of this item will be required: </span>Galvanised steel pipework 100mm diameter',
          classes: 'govuk-label--m'
        },
        validate: [
          {
            type: 'NOT_EMPTY',
            error: 'Enter pipework volume'
          },
          {
            type: 'REGEX',
            regex: INTERGERS_AND_DECIMALS,
            error: 'Volume must only include numbers'
          },
          {
            type: 'INCLUDES',
            checkArray: ['.'],
            error: 'Volume must be a whole number'
          },
          {
            type: 'MIN_MAX',
            min: 1,
            max: 9999,
            error: 'Volume must be between 1-9999'
          }
        ]
      },
      {
        yarKey: 'Galvanisedsteelpipework150mmdiameter',
        type: 'text',
        pattern: '[0-9]*',
        inputmode: 'numeric',
        suffix: { text: 'metre(s)' },
        hint: {
          text: 'Grant amount: £24 per metre'
        },
        classes: 'govuk-input--width-3',
        label: {
          html: '<span class=\"govuk-visually-hidden\">How many per metre of this item will be required: </span>Galvanised steel pipework 150mm diameter',
          classes: 'govuk-label--m'
        },
        validate: [
          {
            type: 'NOT_EMPTY',
            error: 'Enter pipework volume'
          },
          {
            type: 'REGEX',
            regex: INTERGERS_AND_DECIMALS,
            error: 'Volume must only include numbers'
          },
          {
            type: 'INCLUDES',
            checkArray: ['.'],
            error: 'Volume must be a whole number'
          },
          {
            type: 'MIN_MAX',
            min: 1,
            max: 9999,
            error: 'Volume must be between 1-9999'
          }
        ]
      },
      {
        yarKey: 'PolyethylenePEorequivalentpipework100mmdiameter',
        type: 'text',
        pattern: '[0-9]*',
        inputmode: 'numeric',
        suffix: { text: 'metre(s)' },
        hint: {
          text: 'Grant amount: £8 per metre'
        },
        classes: 'govuk-input--width-3',
        label: {
          html: '<span class=\"govuk-visually-hidden\">How many per metre of this item will be required: </span>Polyethylene (PE) or equivalent pipework 100mm diameter',
          classes: 'govuk-label--m'
        },
        validate: [
          {
            type: 'NOT_EMPTY',
            error: 'Enter pipework volume'
          },
          {
            type: 'REGEX',
            regex: INTERGERS_AND_DECIMALS,
            error: 'Volume must only include numbers'
          },
          {
            type: 'INCLUDES',
            checkArray: ['.'],
            error: 'Volume must be a whole number'
          },
          {
            type: 'MIN_MAX',
            min: 1,
            max: 9999,
            error: 'Volume must be between 1-9999'
          }
        ]
      },
      {
        yarKey: 'PolyethylenePEorequivalentpipework150mmdiameter',
        type: 'text',
        pattern: '[0-9]*',
        inputmode: 'numeric',
        suffix: { text: 'metre(s)' },
        hint: {
          text: 'Grant amount: £9 per metre'
        },
        classes: 'govuk-input--width-3',
        label: {
          html: '<span class=\"govuk-visually-hidden\">How many per metre of this item will be required: </span>Polyethylene (PE) or equivalent pipework 150mm diameter',
          classes: 'govuk-label--m'
        },
        validate: [
          {
            type: 'NOT_EMPTY',
            error: 'Enter pipework volume'
          },
          {
            type: 'REGEX',
            regex: INTERGERS_AND_DECIMALS,
            error: 'Volume must only include numbers'
          },
          {
            type: 'INCLUDES',
            checkArray: ['.'],
            error: 'Volume must be a whole number'
          },
          {
            type: 'MIN_MAX',
            min: 1,
            max: 9999,
            error: 'Volume must be between 1-9999'
          }
        ]
      },
      {
        yarKey: 'Underfloortransferchannels',
        type: 'text',
        pattern: '[0-9]*',
        inputmode: 'numeric',
        suffix: { text: 'metre(s)' },
        hint: {
          text: 'Grant amount: £25 per metre'
        },
        classes: 'govuk-input--width-3',
        label: {
          html: '<span class=\"govuk-visually-hidden\">How many per metre of this item will be required: </span>Under-floor transfer channels',
          classes: 'govuk-label--m'
        },
        validate: [
          {
            type: 'NOT_EMPTY',
            error: 'Enter transfer channels volume'
          },
          {
            type: 'REGEX',
            regex: INTERGERS_AND_DECIMALS,
            error: 'Volume must only include numbers'
          },
          {
            type: 'INCLUDES',
            checkArray: ['.'],
            error: 'Volume must be a whole number'
          },
          {
            type: 'MIN_MAX',
            min: 1,
            max: 9999,
            error: 'Volume must be between 1-9999'
          }
        ]
      },
      {
        yarKey: 'Slurrystorewallmixerswithstorecapacityupto1200cubicmetre',
        type: 'text',
        pattern: '[0-9]*',
        inputmode: 'numeric',
        suffix: { text: 'item(s)' },
        hint: {
          text: 'Grant amount: £350 per tank'
        },
        classes: 'govuk-input--width-3',
        label: {
          html: '<span class=\"govuk-visually-hidden\">How many per tank of this item will be required: </span>Slurry store wall mixers with store capacity up to 1,200 cubic metre',
          classes: 'govuk-label--m'
        },
        validate: [
          {
            type: 'NOT_EMPTY',
            error: 'Enter agitator quantity'
          },
          {
            type: 'REGEX',
            regex: INTERGERS_AND_DECIMALS,
            error: 'Quantity must only include numbers'
          },
          {
            type: 'INCLUDES',
            checkArray: ['.'],
            error: 'Quantity must be a whole number'
          },
          {
            type: 'MIN_MAX',
            min: 1,
            max: 9999,
            error: 'Quantity must be between 1-9999'
          }
        ]
      },
      {
        yarKey: 'Slurrystorewallmixerswithstorecapacityupto8000cubicmetre',
        type: 'text',
        pattern: '[0-9]*',
        inputmode: 'numeric',
        suffix: { text: 'item(s)' },
        hint: {
          text: 'Grant amount: £1,000 per tank'
        },
        classes: 'govuk-input--width-3',
        label: {
          html: '<span class=\"govuk-visually-hidden\">How many per tank of this item will be required: </span>Slurry store wall mixers with store capacity up to 8,000 cubic metre',
          classes: 'govuk-label--m'
        },
        validate: [
          {
            type: 'NOT_EMPTY',
            error: 'Enter agitator quantity'
          },
          {
            type: 'REGEX',
            regex: INTERGERS_AND_DECIMALS,
            error: 'Quantity must only include numbers'
          },
          {
            type: 'INCLUDES',
            checkArray: ['.'],
            error: 'Quantity must be a whole number'
          },
          {
            type: 'MIN_MAX',
            min: 1,
            max: 9999,
            error: 'Quantity must be between 1-9999'
          }
        ]
      },
      {
        yarKey: 'Inspectionplatformwithladderforabovegroundconcreteandsteelslurrystore',
        type: 'text',
        pattern: '[0-9]*',
        inputmode: 'numeric',
        suffix: { text: 'item(s)' },
        hint: {
          text: 'Grant amount: £800 per item'
        },
        classes: 'govuk-input--width-3',
        label: {
          html: '<span class=\"govuk-visually-hidden\">How many per item of this item will be required: </span>Inspection platform with ladder for above-ground concrete and steel slurry store',
          classes: 'govuk-label--m'
        },
        validate: [
          {
            type: 'NOT_EMPTY',
            error: 'Enter safety equipment quantity'
          },
          {
            type: 'REGEX',
            regex: INTERGERS_AND_DECIMALS,
            error: 'Quantity must only include numbers'
          },
          {
            type: 'INCLUDES',
            checkArray: ['.'],
            error: 'Quantity must be a whole number'
          },
          {
            type: 'MIN_MAX',
            min: 1,
            max: 9999,
            error: 'Quantity must be between 1-9999'
          }
        ]
      },
      {
        yarKey: 'Safetyfencingforstoresconstructedbelowgorundleveearthbanklagoonsandslurrybags',
        type: 'text',
        pattern: '[0-9]*',
        inputmode: 'numeric',
        suffix: { text: 'metre(s)' },
        hint: {
          text: 'Grant amount: £55 per metre'
        },
        classes: 'govuk-input--width-3',
        label: {
          html: '<span class=\"govuk-visually-hidden\">How many per metre of this item will be required: </span>Safety fencing for stores constructed below gorund leve, earth-bank lagoons and slurry bags',
          classes: 'govuk-label--m'
        },
        validate: [
          {
            type: 'NOT_EMPTY',
            error: 'Enter safety equipment quantity'
          },
          {
            type: 'REGEX',
            regex: INTERGERS_AND_DECIMALS,
            error: 'Quantity must only include numbers'
          },
          {
            type: 'INCLUDES',
            checkArray: ['.'],
            error: 'Quantity must be a whole number'
          },
          {
            type: 'MIN_MAX',
            min: 1,
            max: 9999,
            error: 'Quantity must be between 1-9999'
          }
        ]
      }

    ])
  })

  test('Should return blank array if no object', () => {
    const mockRequest = {
      yar: {
        get: (key) => {
          if (key === 'referenceCostObject') {
            return {}
          } else {
            return itemsList
          }
        }
      }
    }
    const response = formatOtherItems(mockRequest)

    expect(response).toEqual([])
  })
})
