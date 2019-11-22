var base = require('./base')
var isArrayish = require('is-arrayish')

module.exports = base(function isHash (o) {
  return typeof o === 'object' && !isArrayish(o)
})
