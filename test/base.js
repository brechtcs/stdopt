var test = require('tape')

test('opt', t => {
  var { opt } = require('../')
  t.equal(opt('value').value(), 'value')
  t.throws(() => opt(null).value(), /Value should be defined/)
  t.throws(() => opt(null).or(new Error('nope')).value(), /nope/)
  t.equal(opt('value').or('nope').value(), 'value')
  t.equal(opt().or('nope').value(), 'nope')
  t.equal(opt().or().or('nope').value(), 'nope')
  t.equal(opt().raw(), undefined)
  t.equal(opt().or(null).raw(), null)
  t.throws(() => opt(null).or(undefined).value())
  t.throws(() => opt(undefined).use())
  t.ok(opt('some').use().isValid)
  t.end()
})

test('custom', t => {
  var Base = require('../base')
  var apply = require('../util/apply')

  var Custom = apply(function Custom (input) {
    Base.call(this, input)
  })

  Custom.parse = function (val) {
    t.notOk(val instanceof Base)
    t.notOk(val instanceof Error)

    if (typeof val !== 'string') {
      return new Error('Custom should be string')
    }
    if (val.toLowerCase() !== 'custom') {
      return new Error('Custom should contain "custom"')
    }
    return val
  }

  var Nested = apply(function Nested (input) {
    Base.call(this, input)
  })

  Nested.parse = function (input) {
    return Custom(input)
  }

  var Fail = apply(function Fail (input) {
    Base.call(this, input)
  })

  var Unparseable = apply(function Unparseable (input) {
    Base.call(this, input)
  })

  Unparseable.parse = function () {}

  t.equal(Custom('cUsToM').value(), 'cUsToM')
  t.equal(Custom('stuff').or('Custom').value(), 'Custom')
  t.equal(Nested('custom').value(), 'custom')
  t.throws(() => Custom(365).value(), /Custom should be string/)
  t.throws(() => Custom('stuff').value(), /Custom should contain/)
  t.throws(() => Nested('stuff').value(), /Custom should contain/)
  t.throws(() => Fail('stuff').or('bleh').value(), /No parser for Fail/)
  t.throws(() => Fail('stuff').value(), /No parser for Fail/)
  t.throws(() => Unparseable('any').value(), /Value any cannot be parsed as Unparseable/)

  t.equal(Custom(Custom('custom')).value(), 'custom')
  t.throws(() => Custom(Unparseable('any')).value(), /Value any cannot be parsed as Unparseable/)
  t.throws(() => Unparseable(Custom(365)).value(), /Custom should be string/)
  t.end()
})
