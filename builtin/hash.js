var Opt = require('../opt')
var OptError = require('../error')

function hash (obj, struct) {
  if (struct && typeof struct !== 'object') {
    throw new TypeError('Struct should be object')
  }
  Opt.call(this, obj, struct)
}

hash.struct = function (s) {
  return function (obj) {
    return new hash(obj, s) // eslint-disable-line new-cap
  }
}

hash.parse = function (obj, struct) {
  if (typeof obj !== 'object') return
  if (!struct) return Object.assign({}, obj)

  var Type, prop, it, opt, err, descr, result
  result = {}

  for (prop of Object.keys(struct)) {
    it = struct[prop][Symbol.iterator]
    if (typeof struct[prop] !== 'function' && !it) {
      throw new TypeError('Type should be function')
    }

    if (it) {
      for (Type of struct[prop]) {
        if (typeof Type !== 'function') {
          throw new TypeError('Type should be function')
        }
        opt = new Type(obj ? obj[prop] : obj)
        if (opt.isValid) break
      }
    } else {
      Type = struct[prop]
      opt = new Type(obj ? obj[prop] : obj)
    }

    if (opt.isError) {
      err = opt.extract()
      return new OptError(err, prop)
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
  return Object.freeze(Opt.value(this))
}

module.exports = Opt.construct(hash)
