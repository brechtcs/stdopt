var deprecate = require('deprecate')
var inherits = require('inherits')
var prop = require('stdprop')

var VALUE = Symbol('value')

function Base (val, ...args) {
  if (typeof this.constructor.parse !== 'function') {
    throw new TypeError('No parser for ' + this.constructor.name)
  }

  var value = parse.call(this, val, ...args)
  prop(this, VALUE, value)
  prop(this, 'isError', value instanceof Error, 'e')
  prop(this, 'isValid', !this.isError, 'e')

  if (!(this instanceof Base)) {
    inherits(this.constructor, Base)
  }
}

function parse (val, ...args) {
  var nested, value
  nested = val instanceof Base ? val[VALUE] : val
  value = nested instanceof Error ? nested : this.constructor.parse(nested, ...args)

  if (typeof value === 'undefined') {
    return new TypeError(`Value ${val} cannot be parsed as ${this.constructor.name}`)
  }
  return value instanceof Base ? value[VALUE] : value
}

Base.extract = function (opt) {
  return Base.prototype.extract.call(opt)
}

Base.unwrap = function (opt) {
  deprecate('Base.unwrap()', 'Use the equivalent Base.extract() instead.')
  return Base.prototype.extract.call(opt)
}

Base.value = function (opt) {
  return Base.prototype.value.call(opt)
}

Base.prototype.extract = function () {
  return this[VALUE]
}

Base.prototype.or = function (fallback) {
  return this.isValid ? this : new this.constructor(fallback)
}

Base.prototype.use = function (map) {
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

Base.prototype.value = function () {
  return this.use(function (err, val) {
    if (err) throw err
    return val
  })
}

module.exports = Base
