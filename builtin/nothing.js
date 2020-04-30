var Opt = require('../opt')

function nothing (n) {
  Opt.call(this, n)
}

nothing.parse = function (n) {
  if (n === undefined || n === null) {
    return null
  }
}

module.exports = Opt.construct(nothing)
