var OptError = require('./error')
var inherits = require('inherits')
var prop = require('stdprop')

var RAW = Symbol('raw')
var VALUE = Symbol('value')

function Opt (val, ...args) {
  if (typeof this.constructor.parse !== 'function') {
    throw new TypeError('No parser for ' + this.constructor.name)
  }

  var raw = val instanceof Opt ? val[VALUE] : val
  var value = parse.call(this, val, ...args)

  prop(this, RAW, raw)
  prop(this, VALUE, value)
  prop(this, 'isError', value instanceof Error, 'e')
  prop(this, 'isValid', !this.isError, 'e')

  if (!(this instanceof Opt)) {
    inherits(this.constructor, Opt)
  }
}

function parse (val, ...args) {
  var nested, value
  nested = val instanceof Opt ? val[VALUE] : val
  value = nested instanceof Error ? nested : this.constructor.parse(nested, ...args)

  if (typeof value === 'undefined') {
    return new OptError(`Value ${val} cannot be parsed as ${this.constructor.name}`)
  }
  return value instanceof Opt ? value[VALUE] : value
}

Opt.construct = function (Opt) {
  return new Proxy(Opt, {
    apply: (Target, self, args) => new Target(...args)
  })
}

Opt.extract = function (opt) {
  return Opt.prototype.extract.call(opt)
}

Opt.raw = function (opt) {
  return Opt.prototype.raw.call(opt)
}

Opt.value = function (opt) {
  return Opt.prototype.value.call(opt)
}

Opt.prototype.catch = function (Type, fn) {
  if (this.isValid) return this
  if (typeof fn !== 'function') {
    fn = Type
    Type = OptError
  }

  if (!(this[VALUE] instanceof Type)) {
    return this
  }

  try {
    var val = typeof fn === 'string'
      ? new OptError(this[VALUE], fn)
      : fn(this[VALUE])
    return new this.constructor(val)
  } catch (err) {
    return new this.constructor(err)
  }
}

Opt.prototype.extract = function () {
  return this[VALUE]
}

Opt.prototype.map = function (fn) {
  try {
    var val = this.isValid ? fn(this[VALUE]) : this
    return new this.constructor(val)
  } catch (err) {
    return new this.constructor(err)
  }
}

Opt.prototype.or = function (Opt, fallback) {
  if (typeof Opt !== 'function') {
    fallback = Opt
    Opt = this.constructor
  }
  return this.isValid ? this : new Opt(fallback)
}

Opt.prototype.raw = function () {
  return this[RAW]
}

Opt.prototype.value = function () {
  if (this.isValid) {
    return this[VALUE]
  }
  throw this[VALUE]
}

module.exports = Opt
