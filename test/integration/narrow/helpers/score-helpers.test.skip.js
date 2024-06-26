describe('Score helpers', () => {
  test('addSummaryRow - desc provided', () => {
    const dictionary = {
      MOCK_YARKEY: 'MOCK_RETRIEVED_KEY'
    }

    const mockRequest = {
      yar: { get: (key) => (dictionary[key]) }
    }

    const object = {
      key: 'MOCK_KEY',
      title: 'MOCK_TITLE',
      yarKey: 'MOCK_YARKEY',
      desc: 'MOCK_DESC',
      url: 'MOCK_URL',
      order: 'MOCK_ORDER',
      unit: 'MOCK_UNIT',
      pageTitle: 'MOCK_PAGE_TITLE',
      fundingPriorities: 'MOCK_FUNDING'
    }

    const rating = 12

    const { addSummaryRow } = require('../../../../app/helpers/score-helpers')

    expect(addSummaryRow(object, rating, mockRequest)).toEqual({
      key: 'MOCK_KEY',
      answers: [
        {
          key: 'MOCK_KEY',
          title: 'MOCK_TITLE',
          input: [{ value: 'MOCK_RETRIEVED_KEY' }]
        }],
      rating: 12,
      title: 'MOCK_TITLE',
      desc: 'MOCK_DESC',
      url: 'MOCK_URL',
      order: 'MOCK_ORDER',
      unit: 'MOCK_UNIT',
      pageTitle: 'MOCK_PAGE_TITLE',
      fundingPriorities: 'MOCK_FUNDING'
    })
  })

  test('addSummaryRow - desc missing', () => {
    const dictionary = {
      MOCK_YARKEY: 'MOCK_RETRIEVED_KEY'
    }

    const mockRequest = {
      yar: { get: (key) => (dictionary[key]) }
    }

    const object = {
      key: 'MOCK_KEY',
      title: 'MOCK_TITLE',
      yarKey: 'MOCK_YARKEY',
      url: 'MOCK_URL',
      order: 'MOCK_ORDER',
      unit: 'MOCK_UNIT',
      pageTitle: 'MOCK_PAGE_TITLE',
      fundingPriorities: 'MOCK_FUNDING'
    }

    const rating = 12

    const { addSummaryRow } = require('../../../../app/helpers/score-helpers')

    expect(addSummaryRow(object, rating, mockRequest)).toEqual({
      key: 'MOCK_KEY',
      answers: [
        {
          key: 'MOCK_KEY',
          title: 'MOCK_TITLE',
          input: [{ value: 'MOCK_RETRIEVED_KEY' }]
        }],
      rating: 12,
      title: 'MOCK_TITLE',
      desc: '',
      url: 'MOCK_URL',
      order: 'MOCK_ORDER',
      unit: 'MOCK_UNIT',
      pageTitle: 'MOCK_PAGE_TITLE',
      fundingPriorities: 'MOCK_FUNDING'
    })
  })
})
