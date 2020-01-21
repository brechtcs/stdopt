var Base = require('./base')
var isArrayish = require('is-arrayish')

var List = Base.implement('list')

List.parse = function (l) {
  if (Array.isArray(l)) return l
  if (isArrayish(l)) return Array.from(l)
}

module.exports = List
