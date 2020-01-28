var Base = require('./base')
var apply = require('./util/apply')
var isArrayish = require('is-arrayish')

function list (l) {
  Base.call(this, l)
}

list.parse = function (l) {
  if (Array.isArray(l)) return l
  if (isArrayish(l)) return Array.from(l)
}

module.exports = apply(list)
