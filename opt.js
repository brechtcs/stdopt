var Base = require('./base')
var Opt = Base.implement('value')

Opt.isValid = function (val) {
  return val !== undefined && val !== null
}

module.exports = Opt
