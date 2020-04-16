var Base = require('./base')
var VError = require('verror')

function hash (obj, struct) {
  if (struct && typeof struct !== 'object') {
    throw new Error('Struct should be object')
  }
  Base.call(this, obj, struct)
}

hash.struct = function (s) {
  return function (obj) {
    return new hash(obj, s) // eslint-disable-line new-cap
  }
}

hash.parse = function (obj, struct) {
  if (typeof obj !== 'object') return
  if (!struct) return Object.assign({}, obj)

  var prop, it, type, opt, err, descr, result
  result = {}

  for (prop of Object.keys(struct)) {
    it = struct[prop][Symbol.iterator]
    if (typeof struct[prop] !== 'function' && !it) {
      throw new Error('Type should be function')
    }

    if (it) {
      for (type of struct[prop]) {
        if (typeof type !== 'function') {
          throw new Error('Type should be function')
        }
        opt = type(obj ? obj[prop] : obj)
        if (opt.isValid) break
      }
    } else {
      opt = struct[prop](obj ? obj[prop] : obj)
    }

    if (opt.isError) {
      err = opt.extract()
      return new VError(err, prop)
    }

    descr = Object.getOwnPropertyDescriptor(obj, prop)
    Object.defineProperty(result, prop, {
      value: opt.value(),
      configurable: descr ? descr.configurable : false,
      enumerable: descr ? descr.enumerable : false,
      writable: descr ? descr.writable : false
    })
  }
  return result
}

hash.prototype.value = function () {
  return Object.freeze(Base.value(this))
}

module.exports = Base.construct(hash)
