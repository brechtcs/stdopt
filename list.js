var Base = require('./base')
var apply = require('./util/apply')
var isArrayish = require('is-arrayish')

function list (l, type) {
  if (type && typeof type !== 'function' && !type[Symbol.iterator]) {
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

  var idx, t, opt, err, result
  result = []

  for (idx = 0; idx < l.length; idx++) {
    if (type[Symbol.iterator]) {
      for (t of type) {
        if (typeof t !== 'function') {
          throw new Error('Type should be function')
        }
        opt = t(l[idx])
        if (opt.isValid) break
      }
    } else {
      opt = type(l[idx])
    }

    if (opt.isError) {
      err = opt.extract()
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
