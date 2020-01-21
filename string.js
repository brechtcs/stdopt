var Base = require('./base')
var Str = Base.implement('string')

Str.parse = function (s) {
  if (typeof s === 'string') {
    return s
  }
  if (typeof s === 'number' || s instanceof String) {
    return String(s)
  }
}

module.exports = Str
