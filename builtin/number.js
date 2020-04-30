var Base = require('./base')

function number (n) {
  Base.call(this, n)
}

number.parse = function (n) {
  if (n === null) return
  var number = Number(n)
  if (!Number.isNaN(number)) {
    return number
  }
}

module.exports = Base.construct(number)
