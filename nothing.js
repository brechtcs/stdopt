var Base = require('./base')
var apply = require('./util/apply')

function nothing (n) {
  Base.call(this, n)
}

nothing.parse = function (n) {
  if (n === undefined || n === null) {
    return null
  }
}

module.exports = apply(nothing)
