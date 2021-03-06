var Opt = require('../opt')
var OptError = require('../error')
var some = require('./some')
var isArrayish = require('is-arrayish')

function list (l, type) {
  if (type && typeof type !== 'function' && !type[Symbol.iterator]) {
    throw new TypeError('Type should be function')
  }
  Opt.call(this, l, type)
}

list.of = function (type) {
  return function (l) {
    return new list(l, type) // eslint-disable-line new-cap
  }
}

list.parse = function (l, Type) {
  if (!isArrayish(l)) {
    if (some(l).isValid) l = [l]
    else return
  }
  if (!Type) return Array.from(l)

  var T, idx, opt, err, result
  result = []

  for (idx = 0; idx < l.length; idx++) {
    if (Type[Symbol.iterator]) {
      for (T of Type) {
        if (typeof T !== 'function') {
          throw new TypeError('Type should be function')
        }
        opt = new T(l[idx])
        if (opt.isValid) break
      }
    } else {
      opt = new Type(l[idx])
    }

    if (opt.isError) {
      err = opt.extract()
      return new OptError(err, `[${idx}]`)
    } else {
      result.push(opt.value())
    }
  }
  return result
}

list.prototype.value = function () {
  return Object.freeze(Opt.value(this))
}

module.exports = Opt.construct(list)
