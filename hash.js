var Base = require('./base')
var apply = require('./util/apply')

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

  var prop, opt, err, descr, result
  result = {}

  for (prop of Object.keys(struct)) {
    if (typeof struct[prop] !== 'function') {
      throw new Error('Type should be function')
    }
    opt = struct[prop](obj[prop])

    if (opt.isError) {
      err = opt.extract()
      return new err.constructor(`${prop} -> ${err.message}`)
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

module.exports = apply(hash)
