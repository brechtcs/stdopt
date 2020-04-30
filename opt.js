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
    return new TypeError(`Value ${val} cannot be parsed as ${this.constructor.name}`)
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

Opt.prototype.extract = function () {
  return this[VALUE]
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

Opt.prototype.use = function (map) {
  if (typeof map === 'function') {
    return this.isValid
      ? map.call(this, null, this[VALUE])
      : map.call(this, this[VALUE])
  }

  if (this.isValid) {
    return this
  }
  throw this[VALUE]
}

Opt.prototype.value = function () {
  return this.use(function (err, val) {
    if (err) throw err
    return val
  })
}

module.exports = Opt
