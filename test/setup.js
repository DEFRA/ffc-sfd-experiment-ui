beforeEach(async () => {
  // ...
  // Set reference to server in order to close the server during teardown.
  const createServer = require('../app/server')
  const mockSession = {
    getCurrentPolicy: (_request, _h) => true,
    createDefaultPolicy: (_h) => true,
    updatePolicy: (_request, _h, _analytics) => null,
    validSession: (_request) => global.__VALIDSESSION__ ?? true,
    sessionIgnorePaths: []
  }

  jest.mock('../app/cookies/index', () => mockSession)
  jest.mock('../app/services/gapi-service.js', () => ({
    sendGAEvent: (category, action, label, value) => {
      return Promise.resolve()
    },
    isBlockDefaultPageView: (url) => false,
    eventTypes: {
      PAGEVIEW: 'pageview',
      ELIGIBILITIES: 'eligibilities',
      ELIGIBILITY: 'eligibility_passed',
      CONFIRMATION: 'confirmation',
      ELIMINATION: 'elimination',
      EXCEPTION: 'exception'
    }
  }))
  jest.mock('../app/services/app-insights.js')
  jest.mock('applicationinsights')
  const server = await createServer()
  await server.start()
  global.__SERVER__ = server
  global.__VALIDSESSION__ = true
  global.__URLPREFIX__ = require('../app/config/server').urlPrefix
})
