var Opt = require('../opt')
var OptError = require('../error')

function some (val) {
  Opt.call(this, val)
}

some.parse = function (val) {
  if (val !== undefined && val !== null) {
    return val
  }
  return new OptError('Value should be defined')
}

module.exports = Opt.construct(some)
