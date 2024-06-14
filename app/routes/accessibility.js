const urlPrefix = require('../config/server').urlPrefix

module.exports = {
  method: 'GET',
  path: `${urlPrefix}/accessibility`,
  handler: (_request, h) => {
    return h.view('accessibility', { accessibility: 'accessibility' })
  }
}
