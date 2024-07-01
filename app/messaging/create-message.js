const createMessage = (body, type, options) => {
  return {
    body,
    type,
    source: 'ffc-future-grants-tech-evaluation',
    ...options
  }
}

module.exports = createMessage
