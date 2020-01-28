var Base = require('./base')
var apply = require('./util/apply')

function number (n) {
  Base.call(this, n)
}

number.parse = function (n) {
  var number = Number(n)
  if (!Number.isNaN(number)) {
    return number
  }
}

module.exports = apply(number)
