const createMessage = (body, type, options) => {
  return {
    body,
    type,
    source: 'ffc-sfd-experiment-ui',
    ...options
  }
}

module.exports = createMessage
