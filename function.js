var Base = require('./base')
var Fn = Base.implement('function')

Fn.isValid = function (f) {
  return typeof f === 'function'
}

module.exports = Fn
