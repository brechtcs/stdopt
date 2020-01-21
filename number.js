var Base = require('./base')
var Num = Base.implement('number')

Num.parse = function (n) {
  var number = Number(n)
  if (!Number.isNaN(number)) {
    return number
  }
}

module.exports = Num
