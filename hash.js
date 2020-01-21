var Base = require('./base')
var isArrayish = require('is-arrayish')

var Hash = Base.implement('hash')

Hash.parse = function (o) {
  if (isArrayish(o)) {
    return new TypeError(`Value ${o} is a list, should be hash`)
  }
  if (typeof o === 'object') {
    return o
  }
}

module.exports = Hash
