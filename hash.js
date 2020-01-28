var Base = require('./base')
var apply = require('./util/apply')
var isArrayish = require('is-arrayish')

function hash (o) {
  Base.call(this, o)
}

hash.parse = function (o) {
  if (isArrayish(o)) {
    return new TypeError(`Value ${o} is a list, should be hash`)
  }
  if (typeof o === 'object') {
    return o
  }
}

module.exports = apply(hash)
