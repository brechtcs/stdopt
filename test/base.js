var test = require('tape')

test('some', t => {
  var { some } = require('../')
  t.equal(some('value').value(), 'value')
  t.throws(() => some(null).value(), /Value should be defined/)
  t.throws(() => some(null).or(new Error('nope')).value(), /nope/)
  t.equal(some('value').or('nope').value(), 'value')
  t.equal(some().or('nope').value(), 'nope')
  t.equal(some().or().or('nope').value(), 'nope')
  t.equal(some().raw(), undefined)
  t.equal(some().or(null).raw(), null)
  t.throws(() => some(null).or(undefined).value())
  t.end()
})

test('custom', t => {
  var Opt = require('../opt')

  var Custom = Opt.construct(function Custom (input) {
    Opt.call(this, input)
  })

  Custom.parse = function (val) {
    t.notOk(val instanceof Opt)
    t.notOk(val instanceof Error)

    if (typeof val !== 'string') {
      return new Error('Custom should be string')
    }
    if (val.toLowerCase() !== 'custom') {
      return new Error('Custom should contain "custom"')
    }
    return val
  }

  var Nested = Opt.construct(function Nested (input) {
    Opt.call(this, input)
  })

  Nested.parse = function (input) {
    return Custom(input)
  }

  var Fail = Opt.construct(function Fail (input) {
    Opt.call(this, input)
  })

  var Unparseable = Opt.construct(function Unparseable (input) {
    Opt.call(this, input)
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
