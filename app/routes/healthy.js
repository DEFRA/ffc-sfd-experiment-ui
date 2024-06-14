module.exports = {
  method: 'GET',
  path: '/healthy',
  handler: (_request, h) => {
    return h.response('ok').code(200)
  }
}
