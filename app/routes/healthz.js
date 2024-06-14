module.exports = {
  method: 'GET',
  path: '/healthz',
  handler: (_request, h) => {
    return h.response('ok').code(200)
  }
}
