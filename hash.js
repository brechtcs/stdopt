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
  if (!struct) return obj

  var prop, opt, result
  result = {}

  for (prop of Object.keys(struct)) {
    if (typeof struct[prop] !== 'function') {
      throw new Error('Type should be function')
    }
    opt = struct[prop](obj[prop])

    if (opt.isError) {
      var err = opt.extract()
      return new err.constructor(`${prop} -> ${err.message}`)
    } else {
      result[prop] = opt.value()
    }
  }
  return result
}

module.exports = apply(hash)
