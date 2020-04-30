var Opt = require('../opt')

function number (n) {
  Opt.call(this, n)
}

number.parse = function (n) {
  if (n === null) return
  var number = Number(n)
  if (!Number.isNaN(number)) {
    return number
  }
}

module.exports = Opt.construct(number)
