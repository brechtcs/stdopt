var DESCRIPTION = Symbol('description')
var RAW = Symbol('raw')
var VALUE = Symbol('value')

function Base () {}

Base.implement = function (name) {
  function Opt (val) {
    if (typeof Opt.parse !== 'function') {
      throw new TypeError('No parser for ' + name)
    } else if (!(this instanceof Opt)) {
      return new Opt(val)
    }
    this[DESCRIPTION] = name || 'stdopt'
    this[RAW] = val
    this[VALUE] = Opt.parse(val)
    this.isError = this[VALUE] instanceof Error
    this.isValid = !this.isError && this[VALUE] !== undefined
  }

  Opt.isValid = function (val) {
    return Opt(val).isValid
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
  throw new TypeError(`Value ${this[RAW]} cannot be parsed as ${this[DESCRIPTION]}`)
}

Base.prototype.or = function (fallback) {
  return this.isValid ? this : new this.constructor(fallback)
}

Base.prototype.value = Base.prototype.val = function () {
  return this.check()[VALUE]
}

module.exports = Base
