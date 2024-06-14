const { cookieOptions, urlPrefix } = require('../config/server')
const { getCurrentPolicy, validSession, sessionIgnorePaths } = require('../cookies')
const cacheConfig = require('../config/cache')
const { getYarValue } = require('../helpers/session')
require('dotenv')

module.exports = {
  plugin: {
    name: 'cookies',
    register: (server, _options) => {
      server.state('cookies_policy', cookieOptions)

      server.ext('onPreResponse', (request, h) => {
        let showTimeout = false
        if (!sessionIgnorePaths.find(path => request.path.startsWith(path)) && request.path !== '/') {
          showTimeout = true
          const allUrls = []
          let allQuestions
          try {
            allQuestions = getYarValue(request, 'grant-questions')
            if (allQuestions) {
              allQuestions.forEach(item => allUrls.push(item.url))
            }
          }
          catch (err) {
            allQuestions = []
          }
          if (!validSession(request) && allUrls.filter(route => request.path.toLowerCase() === `${urlPrefix}/${route.toLowerCase()}`).length > 0) {
            return h.redirect(`${urlPrefix}/session-timeout`)
          }
        }

        const statusCode = request.response.statusCode
        if (request.response.variety === 'view' && statusCode !== 404 && statusCode !== 500 && request.response.source.manager._context) {
          const cookiesPolicy = getCurrentPolicy(request, h)
          request.response.source.manager._context.cookiesPolicy = cookiesPolicy
          request.response.source.manager._context.showTimeout = showTimeout
          request.response.source.manager._context.sessionTimeoutInMin = (cacheConfig.expiresIn / 60000) - 5
          request.response.source.manager._context.surveyLink = process.env.SURVEY_LINK
        }

        return h.continue
      })
    }
  }
}
