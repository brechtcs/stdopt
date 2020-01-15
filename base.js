var DESCRIPTION = Symbol('description')
var VALUE = Symbol('value')

function Base () {}

Base.implement = function (name) {
  function Opt (val) {
    if (typeof Opt.isValid !== 'function') {
      throw new TypeError('No validator for ' + name)
    } else if (!(this instanceof Opt)) {
      return new Opt(val)
    }
    this[VALUE] = val
    this[DESCRIPTION] = name || 'stdopt'
    this.isError = val instanceof Error
    this.isValid = !this.isError && Opt.isValid(val)
  }

  Object.setPrototypeOf(Opt.prototype, Base.prototype)
  Object.defineProperty(Opt, 'super_', {
    value: Base,
    configurable: true,
    writable: true
  })

  return Opt
}

Base.unwrap = function (opt) {
  return opt[VALUE]
}

Base.value = function (opt) {
  return Base.prototype.value.call(opt)
}

Base.prototype.check = function () {
  if (this.isValid) {
    return this
  } else if (this.isError) {
    throw this[VALUE]
  }
  throw new TypeError(`Invalid ${this[DESCRIPTION]}: ${this}`)
}

Base.prototype.or = function (fallback) {
  return this.isValid ? this : new this.constructor(fallback)
}

Base.prototype.value = Base.prototype.val = function () {
  return this.check()[VALUE]
}

Base.prototype.toString = function () {
  var val = this[VALUE]
  var ellipsis = ''

  if (typeof val === 'string' || val instanceof String) {
    val = val.substring(0, 27)
    ellipsis = val.length > 27 ? '...' : ''
  } else if (Array.isArray(val)) {
    val = val.slice(0, 2)
    ellipsis = val.length > 2 ? ',...' : ''
  }
  return String(val) + ellipsis
}

module.exports = Base
