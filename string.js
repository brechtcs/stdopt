var base = require('./base')

module.exports = function string (val) {
  var wrap = base(isString)
  var box = wrap(val)

  function or (fallback) {
    return string(isString(val) ? val : fallback)
  }

  function value () {
    return String(box.value())
  }

  return { ...box, or, value }
}

function isString (s) {
  return typeof s === 'string' || typeof s === 'number' || s instanceof String
}
