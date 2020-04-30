var Base = require('../opt')

function some (val) {
  Base.call(this, val)
}

some.parse = function (val) {
  if (val !== undefined && val !== null) {
    return val
  }
  return new Error('Value should be defined')
}

module.exports = Base.construct(some)
