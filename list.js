var base = require('./base')
var isArrayish = require('is-arrayish')

module.exports = function list (val) {
  var wrap = base(isArrayish)
  var box = wrap(val)

  function or (fallback) {
    return list(isArrayish(val) ? val : fallback)
  }

  function value () {
    var v = box.value()
    return Array.isArray(v) ? v : Array.from(v)
  }

  return { or, value, list: value }
}
