var Base = require('./base')
var Opt = Base.implement('value')

Opt.parse = function (val) {
  if (val !== undefined && val !== null) {
    return val
  }
  return new Error('Value should be defined')
}

module.exports = Opt
