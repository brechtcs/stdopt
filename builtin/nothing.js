var Base = require('../opt')

function nothing (n) {
  Base.call(this, n)
}

nothing.parse = function (n) {
  if (n === undefined || n === null) {
    return null
  }
}

module.exports = Base.construct(nothing)
