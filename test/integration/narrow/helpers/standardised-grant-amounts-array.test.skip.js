const { formatAnswerArray } = require('../../../../app/helpers/reference-grant-amounts-array')

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
            amount: 21234,
            unit: 'per unit'
          },
          {
            item: 'Screw press',
            amount: 22350,
            unit: 'per unit'
          },
          {
            item: 'Gantry',
            amount: 5154,
            unit: 'per unit'
          },
          {
            item: 'Concrete pad',
            amount: 6414,
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
            item: 'Galvanised steel pipework 150mm diameter diameter',
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
            item: 'Slurry store wall mixers with store capacity up to 8,000 cubic metre ',
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

describe('reference Cost Answers Array Function', () => {
  test('Should return array correctly when object, question key and key to be found in object sent', () => {
    const mockRequest = {
      yar: { get: (key) => (objectToSend) }
    }

    const response = formatAnswerArray(mockRequest, 'test-answers', 'cat-storage')

    expect(response).toEqual([
      {
        key: 'test-answers-A1',
        value: 'Above-ground steel slurry store',
        sidebarFormattedValue: 'Above-ground steel slurry store',
        hint: {
          html: 'Grant amount: £22 per cubic metre'
        },
        numericalValue: 22
      },
      {
        key: 'test-answers-A2',
        value: 'Precast circular concrete slurry store',
        sidebarFormattedValue: 'Precast circular concrete slurry store',
        hint: {
          html: 'Grant amount: £17 per cubic metre'
        },
        numericalValue: 17
      },
      {
        key: 'test-answers-A3',
        value: 'In-situ cast-reinforced concrete slurry store',
        sidebarFormattedValue: 'In-situ cast-reinforced concrete slurry store',
        hint: {
          html: 'Grant amount: £15 per cubic metre'
        },
        numericalValue: 15
      },
      {
        key: 'test-answers-A4',
        value: 'Earth-bank lagoon with consolidated clay lining',
        sidebarFormattedValue: 'Earth-bank lagoon with consolidated clay lining',
        hint: {
          html: 'Grant amount: £8 per cubic metre'
        },
        numericalValue: 8
      },
      {
        key: 'test-answers-A5',
        value: 'Earth-bank lagoon with internal liner',
        sidebarFormattedValue: 'Earth-bank lagoon with internal liner',
        hint: {
          html: 'Grant amount: £12 per cubic metre'
        },
        numericalValue: 12
      },
      {
        key: 'test-answers-A6',
        value: 'Stores using pre-cast rectangular concrete panels',
        sidebarFormattedValue: 'Stores using pre-cast rectangular concrete panels',
        hint: {
          html: 'Grant amount: £14 per cubic metre'
        },
        numericalValue: 14
      },
      {
        key: 'test-answers-A7',
        value: 'Large-volume supported slurry bag (over 2,500 cubic metres)',
        sidebarFormattedValue: 'Large-volume supported slurry bag (over 2,500 cubic metres)',
        hint: {
          html: 'Grant amount: £20 per cubic metre'
        },
        numericalValue: 20
      }
    ])
  })

  test('Should return array correctly when hint array sent as well', () => {
    const mockRequest = {
      yar: { get: (key) => (objectToSend) }
    }

    const response = formatAnswerArray(mockRequest, 'test-answers', 'cat-cover-type', ['text1', 'text2', 'text3'])

    expect(response).toEqual([
      {
        key: 'test-answers-A1',
        value: 'Rigid cover for steel or concrete slurry stores',
        sidebarFormattedValue: 'Rigid cover for steel or concrete slurry stores',
        hint: {
          html: 'text1 <br/> (Grant amount: £8 per square metre)'
        },
        numericalValue: 8
      },
      {
        key: 'test-answers-A2',
        value: 'Fixed flexible cover',
        sidebarFormattedValue: 'Fixed flexible cover',
        hint: {
          html: 'text2 <br/> (Grant amount: £4 per square metre)'
        },
        numericalValue: 4
      },
      {
        key: 'test-answers-A3',
        value: 'Floating flexible cover',
        sidebarFormattedValue: 'Floating flexible cover',
        hint: {
          html: 'text3 <br/> (Grant amount: £3 per square metre)'
        },
        numericalValue: 3
      }
    ])
  })

  test('Should return array correctly when objectKey is \'other\'', () => {
    const mockRequest = {
      yar: { get: (key) => (objectToSend) }
    }

    const response = formatAnswerArray(mockRequest, 'test-answers', 'other')

    expect(response).toEqual([
      {
        key: 'test-answers-A1',
        value: 'Reception pit',
        sidebarFormattedValue: 'Reception pit',
        hint: {
          html: 'Grant amount: £30 per cubic metre'
        },
        numericalValue: 30
      },
      {
        key: 'test-answers-A2',
        value: 'Electric-powered slurry transfer pump',
        sidebarFormattedValue: 'Electric-powered slurry transfer pump',
        hint: {
          html: 'Grant amount: £1,050 per pump'
        },
        numericalValue: 1050
      },
      {
        key: 'test-answers-A3',
        value: 'Powered take off (PTO) or hydraulically powered slurry transfer pump',
        sidebarFormattedValue: 'Powered take off (PTO) or hydraulically powered slurry transfer pump',
        hint: {
          html: 'Grant amount: £2,090 per pump'
        },
        numericalValue: 2090
      },
      {
        key: 'test-answers-A4',
        value: 'Centrifugal chopper pump',
        sidebarFormattedValue: 'Centrifugal chopper pump',
        hint: {
          html: 'Grant amount: £950 per pump'
        },
        numericalValue: 950
      },
      {
        key: 'test-answers-A5',
        value: 'Powered take off (PTO) or hydraulically driven chopper pump',
        sidebarFormattedValue: 'Powered take off (PTO) or hydraulically driven chopper pump',
        hint: {
          html: 'Grant amount: £1,700 per pump'
        },
        numericalValue: 1700
      },
      {
        key: 'test-answers-A6',
        value: 'Galvanised steel pipework 100mm diameter',
        sidebarFormattedValue: 'Galvanised steel pipework 100mm diameter',
        hint: {
          html: 'Grant amount: £14 per metre'
        },
        numericalValue: 14
      },
      {
        key: 'test-answers-A7',
        value: 'Galvanised steel pipework 150mm diameter diameter',
        sidebarFormattedValue: 'Galvanised steel pipework 150mm diameter diameter',
        hint: {
          html: 'Grant amount: £24 per metre'
        },
        numericalValue: 24
      },
      {
        key: 'test-answers-A8',
        value: 'Polyethylene (PE) or equivalent pipework 100mm diameter',
        sidebarFormattedValue: 'Polyethylene (PE) or equivalent pipework 100mm diameter',
        hint: {
          html: 'Grant amount: £8 per metre'
        },
        numericalValue: 8
      },
      {
        key: 'test-answers-A9',
        value: 'Polyethylene (PE) or equivalent pipework 150mm diameter',
        sidebarFormattedValue: 'Polyethylene (PE) or equivalent pipework 150mm diameter',
        hint: {
          html: 'Grant amount: £9 per metre'
        },
        numericalValue: 9
      },
      {
        key: 'test-answers-A10',
        value: 'Under-floor transfer channels',
        sidebarFormattedValue: 'Under-floor transfer channels',
        hint: {
          html: 'Grant amount: £25 per metre'
        },
        numericalValue: 25
      },
      {
        key: 'test-answers-A11',
        value: 'Slurry store wall mixers with store capacity up to 1,200 cubic metre',
        sidebarFormattedValue: 'Slurry store wall mixers with store capacity up to 1,200 cubic metre',
        hint: {
          html: 'Grant amount: £350 per tank'
        },
        numericalValue: 350
      },
      {
        key: 'test-answers-A12',
        value: 'Slurry store wall mixers with store capacity up to 8,000 cubic metre ',
        sidebarFormattedValue: 'Slurry store wall mixers with store capacity up to 8,000 cubic metre ',
        hint: {
          html: 'Grant amount: £1,000 per tank'
        },
        numericalValue: 1000
      },
      {
        key: 'test-answers-A13',
        value: 'Inspection platform with ladder for above-ground concrete and steel slurry store',
        sidebarFormattedValue: 'Inspection platform with ladder for above-ground concrete and steel slurry store',
        hint: {
          html: 'Grant amount: £800 per item'
        },
        numericalValue: 800
      },
      {
        key: 'test-answers-A14',
        value: 'Safety fencing for stores constructed below gorund leve, earth-bank lagoons and slurry bags',
        sidebarFormattedValue: 'Safety fencing for stores constructed below gorund leve, earth-bank lagoons and slurry bags',
        hint: {
          html: 'Grant amount: £55 per metre'
        },
        numericalValue: 55
      }
    ])
  })

  test('Should return blank array if no object', () => {
    const mockRequest = {
      yar: { get: (key) => ({}) }
    }

    const response = formatAnswerArray(mockRequest, 'test-answers', 'cat-storage')

    expect(response).toEqual([])
  })

  test('Should return blank array if key does not match', () => {
    const mockRequest = {
      yar: { get: (key) => ({}) }
    }

    const response = formatAnswerArray(mockRequest, 'test-answers', '1245')

    expect(response).toEqual([])
  })
})
