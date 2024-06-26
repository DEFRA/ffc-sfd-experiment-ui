require('dotenv').config()

describe('polling.js', () => {
  const {
    POLLING_INTERVAL,
    POLLING_RETRIES,
    BACKEND_POLLING_HOST
  } = process.env

  const value = require('../../../app/config/polling')

  test('check polling config', () => {
    expect(value).toEqual({
      interval: Number(POLLING_INTERVAL),
      retries: Number(POLLING_RETRIES),
      host: BACKEND_POLLING_HOST
    })
  })
})
