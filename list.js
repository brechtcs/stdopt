var base = require('./base')
var isArrayish = require('is-arrayish')

module.exports = function list (val) {
  var wrap = base(isArrayish)
  var box = wrap(val)

  function or (fallback) {
    return list(isArrayish(val) ? val : fallback)
  }

  function value () {
    return Array.from(box.value())
  }

  return { or, value }
}
