const urlPrefix = require('../config/server').urlPrefix
const currentPath = `${urlPrefix}/start`
const nextPath = `${urlPrefix}/project-location`
const { getReferenceCosts } = require('../messaging/application')


module.exports = {
  method: 'GET',
  path: currentPath,
  handler: async (request, h) => {
    try {
      console.log('Sending session message .....')
      const result = await getReferenceCosts(request.yar.id)
      console.log(result, '[THIS IS RESULT WE GOT BACK]')
      request.yar.set('referenceCostObject', result)
      // return h.view(viewTemplate, createModel({ catagories: result.data.desirability.catagories }, request))
    } catch (error) {
      console.log(error)
      return h.view('500').takeover()
    }
    return h.view('home', { button: { nextLink: nextPath, text: 'Start now' } })
  }
}
