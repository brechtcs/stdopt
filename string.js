var Base = require('./base')
var apply = require('./util/apply')

function string (s) {
  Base.call(this, s)
}

string.parse = function (s) {
  if (typeof s === 'string') {
    return s
  }
  if (typeof s === 'number' || s instanceof String) {
    return String(s)
  }
}

module.exports = apply(string)
