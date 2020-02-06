var Base = require('./base')
var apply = require('./util/apply')
var isArrayish = require('is-arrayish')

function list (l, type) {
  if (type && typeof type !== 'function') {
    throw new Error('Type should be function')
  }
  Base.call(this, l, type)
}

list.of = function (type) {
  return function (l) {
    return new list(l, type) // eslint-disable-line new-cap
  }
}

list.parse = function (l, type) {
  if (!isArrayish(l)) return
  if (!type) return Array.from(l)

  var idx, opt, result
  result = []

  for (idx = 0; idx < l.length; idx++) {
    opt = type(l[idx])
    if (opt.isError) {
      var err = opt.extract()
      return new err.constructor(`[${idx}] -> ${err.message}`)
    } else {
      result.push(opt.value())
    }
  }
  return result
}

list.prototype.value = function () {
  return Object.freeze(Base.value(this))
}

module.exports = apply(list)
