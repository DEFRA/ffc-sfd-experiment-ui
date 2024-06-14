const urlPrefix = require('../config/server').urlPrefix

module.exports = {
  method: 'GET',
  path: `${urlPrefix}/session-timeout`,
  handler: function (_request, h) {
    return h.view('session-timeout', { startLink: `${urlPrefix}/login` })
  }
}
