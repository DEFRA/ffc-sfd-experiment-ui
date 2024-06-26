describe('create-msg', () => {
  jest.mock('../../../../app/helpers/session')
  const { getYarValue } = require('../../../../app/helpers/session')

  const { getDesirabilityAnswers } = require('../../../../app/messaging/create-msg')

  test('check getDesirabilityAnswers()', () => {
    let dict
    getYarValue.mockImplementation((req, key) => (dict[key]))

    dict = {
      productsProcessed: 'prod-processed',
      howAddingValue: 'how-av',
      projectImpact: ['proj-imp'],
      futureCustomers: ['future-cust'],
      collaboration: 'collaboration',
      environmentalImpact: 'env-imp'
    }
    expect(getDesirabilityAnswers({})).toEqual({
      productsProcessed: 'prod-processed',
      howAddingValue: 'how-av',
      projectImpact: ['proj-imp'],
      futureCustomers: ['future-cust'],
      collaboration: 'collaboration',
      environmentalImpact: ['env-imp']
    })

    dict = {
      ...dict,
      environmentalImpact: ['env-imp']
    }
    expect(getDesirabilityAnswers({})).toEqual({
      productsProcessed: 'prod-processed',
      howAddingValue: 'how-av',
      projectImpact: ['proj-imp'],
      futureCustomers: ['future-cust'],
      collaboration: 'collaboration',
      environmentalImpact: ['env-imp']
    })

    dict = {
      ...dict,
      howAddingValue: ['how-av']
    }
    expect(getDesirabilityAnswers({})).toEqual(null)
  })
})
