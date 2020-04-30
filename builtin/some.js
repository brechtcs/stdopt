var Opt = require('../opt')

function some (val) {
  Opt.call(this, val)
}

some.parse = function (val) {
  if (val !== undefined && val !== null) {
    return val
  }
  return new Error('Value should be defined')
}

module.exports = Opt.construct(some)
