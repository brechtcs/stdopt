var VALUE = Symbol('value')
function Base () {}

Base.implement = function (descr) {
  function Opt (val) {
    if (typeof Opt.parse !== 'function') {
      throw new TypeError('No parser for ' + descr)
    } else if (!(this instanceof Opt)) {
      return new Opt(val)
    }

    var nested = val instanceof Base ? val[VALUE] : val
    var parsed = nested instanceof Error ? nested : Opt.parse(nested)

    this[VALUE] = parsed === undefined
      ? new TypeError(`Value ${val} cannot be parsed as ${descr}`)
      : parsed

    this.isError = this[VALUE] instanceof Error
    this.isValid = !this.isError
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
