const { formatSummaryTable } = require('./../../../../app/helpers/project-summary')

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
        key: 'cat-separator',
        title: 'Slurry separator equipment',
        items: [
          {
            item: 'Roller screen press',
            amount: 2,
            unit: 'per unit'
          },
          {
            item: 'Screw press',
            amount: 4,
            unit: 'per unit'
          },
          {
            item: 'Gantry',
            amount: 6,
            unit: 'per unit'
          },
          {
            item: 'Concrete pad',
            amount: 8,
            unit: 'per unit'
          },
          {
            item: 'Concrete bunker',
            amount: 168.18,
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

const itemSizesArray = [
  {
    Receptionpit: 4,
    Electricpoweredslurrytransferpump: 1,
    PoweredtakeoffPTOorhydraulicallypoweredslurrytransferpump: 2,
    Centrifugalchopperpump: 1,
    PoweredtakeoffPTOorhydraulicallydrivenchopperpump: 1,
    Galvanisedsteelpipework100mmdiameter: 1,
    Galvanisedsteelpipework150mmdiameter: 1,
    PolyethylenePEorequivalentpipework100mmdiameter: 1,
    PolyethylenePEorequivalentpipework150mmdiameter: 1,
    Underfloortransferchannels: 1,
    Slurrystorewallmixerswithstorecapacityupto1200cubicmetre: 1,
    Slurrystorewallmixerswithstorecapacityupto8000cubicmetre: 1,
    Inspectionplatformwithladderforabovegroundconcreteandsteelslurrystore: 1,
    Safetyfencingforstoresconstructedbelowgorundleveearthbanklagoonsandslurrybags: 2
  }
]

const separatorOptions = [
  'Roller screen press',
  'Screw press',
  'Gantry',
  'Concrete pad',
  'Concrete bunker'
]

describe('Project Summary Array Function', () => {
  test('Should return array correctly when object sent', () => {
    const dict = {}

    const mockRequest = {
      yar: {
        get: (key) => {
          if (key === 'referenceCostObject') {
            return objectToSend
          } else if (key === 'storageType') {
            return 'Above-ground steel slurry store'
          } else if (key === 'serviceCapacityIncrease') {
            return 5
          } else if (key === 'coverType') {
            return 'Rigid cover for steel or concrete slurry stores'
          } else if (key === 'existingCoverType') {
            return 'Rigid cover for steel or concrete slurry stores'
          } else if (key === 'coverSize') {
            return 6
          } else if (key === 'existingCoverSize') {
            return 6
          } else if (key === 'itemSizeQuantities') {
            return itemSizesArray
          } else if (key === 'separatorOptions') {
            return separatorOptions
          } else if (key === 'concreteBunkerSize') {
            return 101
          } else if (key === 'cappedAmount') {
            return 16818
          } else {
            return itemsList
          }
        },
        set: jest.fn((key, value) => {
          dict[key] = value
        })
      }
    }

    const response = formatSummaryTable(mockRequest)

    expect(response).toEqual([
      {
        item: 'Above-ground steel slurry store',
        amount: '£22',
        quantity: '5m³',
        total: '£110'
      },
      {
        item: 'Rigid cover for steel or concrete slurry grant-funded store cover',
        amount: '£8',
        quantity: '6m²',
        total: '£48'
      },
      {
        item: 'Rigid cover for steel or concrete slurry existing store cover',
        amount: '£8',
        quantity: '6m²',
        total: '£48'
      },
      {
        item: 'Roller screen press',
        amount: '£2',
        quantity: '1',
        total: '£2'
      },
      {
        item: 'Screw press',
        amount: '£4',
        quantity: '1',
        total: '£4'
      },
      {
        item: 'Gantry',
        amount: '£6',
        quantity: '1',
        total: '£6'
      },
      {
        item: 'Concrete pad',
        amount: '£8',
        quantity: '1',
        total: '£8'
      },
      {
        item: 'Concrete bunker',
        amount: '£168.18',
        quantity: '101m²',
        total: '£16,818'
      },
      {
        item: 'Reception pit',
        amount: '£30',
        quantity: '4m³',
        total: '£120'
      },
      {
        item: 'Electric-powered slurry transfer pump',
        amount: '£1,050',
        quantity: '1',
        total: '£1,050'
      },
      {
        item: 'Powered take off (PTO) or hydraulically powered slurry transfer pump',
        amount: '£2,090',
        quantity: '2',
        total: '£4,180'
      },
      {
        item: 'Centrifugal chopper pump',
        amount: '£950',
        quantity: '1',
        total: '£950'
      },
      {
        item: 'Powered take off (PTO) or hydraulically driven chopper pump',
        amount: '£1,700',
        quantity: '1',
        total: '£1,700'
      },
      {
        item: 'Galvanised steel pipework 100mm diameter',
        amount: '£14',
        quantity: '1m',
        total: '£14'
      },
      {
        item: 'Galvanised steel pipework 150mm diameter',
        amount: '£24',
        quantity: '1m',
        total: '£24'
      },
      {
        item: 'Polyethylene (PE) or equivalent pipework 100mm diameter',
        amount: '£8',
        quantity: '1m',
        total: '£8'
      },
      {
        item: 'Polyethylene (PE) or equivalent pipework 150mm diameter',
        amount: '£9',
        quantity: '1m',
        total: '£9'
      },
      {
        item: 'Under-floor transfer channels',
        amount: '£25',
        quantity: '1m',
        total: '£25'
      },
      {
        item: 'Slurry store wall mixers with store capacity up to 1,200 cubic metre',
        amount: '£350',
        quantity: '1',
        total: '£350'
      },
      {
        item: 'Slurry store wall mixers with store capacity up to 8,000 cubic metre',
        amount: '£1,000',
        quantity: '1',
        total: '£1,000'
      },
      {
        item: 'Inspection platform with ladder for above-ground concrete and steel slurry store',
        amount: '£800',
        quantity: '1',
        total: '£800'
      },
      {
        item: 'Safety fencing for stores constructed below gorund leve, earth-bank lagoons and slurry bags',
        amount: '£55',
        quantity: '2m',
        total: '£110'
      }
    ])
  })

  test('Should return blank array if object empty', () => {
    const dict = {}

    const mockRequest = {
      yar: {
        get: (key) => {
          if (key === 'referenceCostObject') {
            return []
          } else if (key === 'storageType') {
            return 'Above-ground steel slurry store'
          } else if (key === 'serviceCapacityIncrease') {
            return 5
          } else if (key === 'coverType') {
            return 'Rigid cover for steel or concrete slurry stores'
          } else if (key === 'exitsingCoverType') {
            return 'Rigid cover for steel or concrete slurry stores'
          } else if (key === 'coverSize') {
            return 6
          } else if (key === 'existingCoverSize') {
            return 6
          } else if (key === 'separatorOptions') {
            return separatorOptions
          } else if (key === 'concreteBunkerSize') {
            return 6
          } else if (key === 'itemSizeQuantities') {
            return itemSizesArray
          } else {
            return itemsList
          }
        },
        set: jest.fn((key, value) => {
          dict[key] = value
        })
      }
    }

    const response = formatSummaryTable(mockRequest)

    expect(response).toEqual([])
  })

  test('Should return blank array if otherItemsArray empty', () => {
    const dict = {}

    const mockRequest = {
      yar: {
        get: (key) => {
          if (key === 'referenceCostObject') {
            return objectToSend
          } else if (key === 'storageType') {
            return 'Above-ground steel slurry store'
          } else if (key === 'serviceCapacityIncrease') {
            return 5
          } else if (key === 'coverType') {
            return 'Rigid cover for steel or concrete slurry stores'
          } else if (key === 'existingCoverType') {
            return 'Rigid cover for steel or concrete slurry stores'
          } else if (key === 'coverSize') {
            return 6
          } else if (key === 'existingCoverSize') {
            return 6
          } else if (key === 'separatorOptions') {
            return separatorOptions
          } else if (key === 'concreteBunkerSize') {
            return 6
          } else if (key === 'itemSizeQuantities') {
            return itemSizesArray
          } else {
            return []
          }
        },
        set: jest.fn((key, value) => {
          dict[key] = value
        })
      }
    }

    const response = formatSummaryTable(mockRequest)

    expect(response).toEqual([])
  })

  test('Should return storage and cover and separator if other items array has none of the above', () => {
    const dict = {}

    const mockRequest = {
      yar: {
        get: (key) => {
          if (key === 'referenceCostObject') {
            return objectToSend
          } else if (key === 'storageType') {
            return 'Above-ground steel slurry store'
          } else if (key === 'serviceCapacityIncrease') {
            return 5
          } else if (key === 'coverType') {
            return 'Rigid cover for steel or concrete slurry stores'
          } else if (key === 'existingCoverType') {
            return 'Rigid cover for steel or concrete slurry stores'
          } else if (key === 'coverSize') {
            return 6
          } else if (key === 'existingCoverSize') {
            return 6
          } else if (key === 'separatorOptions') {
            return separatorOptions
          } else if (key === 'concreteBunkerSize') {
            return 6
          } else if (key === 'itemSizeQuantities') {
            return []
          } else {
            return ['None of the above']
          }
        },
        set: jest.fn((key, value) => {
          dict[key] = value
        })
      }
    }

    const response = formatSummaryTable(mockRequest)

    expect(response).toEqual([
      {
        item: 'Above-ground steel slurry store',
        amount: '£22',
        quantity: '5m³',
        total: '£110'
      },
      {
        item: 'Rigid cover for steel or concrete slurry grant-funded store cover',
        amount: '£8',
        quantity: '6m²',
        total: '£48'
      },
      {
        item: 'Rigid cover for steel or concrete slurry existing store cover',
        amount: '£8',
        quantity: '6m²',
        total: '£48'
      },
      {
        item: 'Roller screen press',
        amount: '£2',
        quantity: '1',
        total: '£2'
      },
      {
        item: 'Screw press',
        amount: '£4',
        quantity: '1',
        total: '£4'
      },
      {
        item: 'Gantry',
        amount: '£6',
        quantity: '1',
        total: '£6'
      },
      {
        item: 'Concrete pad',
        amount: '£8',
        quantity: '1',
        total: '£8'
      },
      {
        item: 'Concrete bunker',
        amount: '£168.18',
        quantity: '6m²',
        total: '£1,009.08'
      }
    ])
  })

  test('Should return only storage if cover, separator and other items array have none of the above', () => {
    const dict = {}

    const mockRequest = {
      yar: {
        get: (key) => {
          if (key == 'referenceCostObject') {
            return objectToSend
          } else if (key == 'storageType') {
            return 'Above-ground steel slurry store'
          } else if (key == 'serviceCapacityIncrease') {
            return 5
          } else if (key == 'coverType') {
            return 'Rigid cover for steel or concrete slurry stores'
          } else if (key == 'existingCoverType') {
            return 'Rigid cover for steel or concrete slurry stores'
          } else if (key == 'coverSize') {
            return null
          } else if (key == 'existingCoverSize') {
            return null
          } else if (key === 'separatorOptions') {
            return []
          } else if (key === 'concreteBunkerSize') {
            return null
          } else if (key == 'itemSizeQuantities') {
            return []
          } else {
            return ['None of the above']
          }
        },
        set: jest.fn((key, value) => {
          dict[key] = value
        })
      }
    }

    const response = formatSummaryTable(mockRequest)

    expect(response).toEqual([
      {
        item: 'Above-ground steel slurry store',
        amount: '£22',
        quantity: '5m³',
        total: '£110'
      }
    ])
  })

  test('Should return only cover if storage, separator and other items array have none of the above', () => {
    const dict = {}

    const mockRequest = {
      yar: {
        get: (key) => {
          if (key == 'referenceCostObject') {
            return objectToSend
          } else if (key == 'storageType') {
            return 'Above-ground steel slurry store'
          } else if (key == 'serviceCapacityIncrease') {
            return null
          } else if (key == 'coverType') {
            return 'Rigid cover for steel or concrete slurry stores'
          } else if (key == 'existingCoverType') {
            return 'Rigid cover for steel or concrete slurry stores'
          } else if (key == 'coverSize') {
            return 6
          } else if (key == 'existingCoverSize') {
            return 6
          } else if (key === 'separatorOptions') {
            return []
          } else if (key === 'concreteBunkerSize') {
            return null
          } else if (key == 'itemSizeQuantities') {
            return []
          } else {
            return ['None of the above']
          }
        },
        set: jest.fn((key, value) => {
          dict[key] = value
        })
      }
    }

    const response = formatSummaryTable(mockRequest)

    expect(response).toEqual([
      {
        item: 'Rigid cover for steel or concrete slurry grant-funded store cover',
        amount: '£8',
        quantity: '6m²',
        total: '£48'
      },
      {
        item: 'Rigid cover for steel or concrete slurry existing store cover',
        amount: '£8',
        quantity: '6m²',
        total: '£48'
      }
    ])
  })
})
