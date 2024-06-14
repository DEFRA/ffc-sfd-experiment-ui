function setYarValue (request, key, value) {
  request.yar.set(key, value)
}

function getYarValue (request, key) {
  if (request.yar) {
    return request.yar.get(key)
  }
  return null
}

function clearYarValue (request, key) {
  request.yar.clear(key)
}

module.exports = {
  setYarValue,
  getYarValue,
  clearYarValue
}
