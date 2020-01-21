var test = require('tape')

test('opt', t => {
  var opt = require('../')

  t.equal(opt('value').value(), 'value')
  t.throws(() => opt(null).value(), /Value should be defined/)
  t.throws(() => opt(null).or(new Error('nope')).value(), /nope/)
  t.equal(opt('value').or('nope').value(), 'value')
  t.equal(opt().or('nope').value(), 'nope')
  t.equal(opt().or().or('nope').value(), 'nope')
  t.throws(() => opt(null).or(undefined).value())
  t.end()
})

test('custom', t => {
  var Base = require('../base')
  var Custom = Base.implement('custom')
  var Fail = Base.implement('fail')
  var Unparseable = Base.implement('unparseable')

  Custom.parse = function (val) {
    if (typeof val !== 'string') {
      return new Error('Custom should be string')
    }
    if (val.toLowerCase() !== 'custom') {
      return new Error('Custom should contain "custom"')
    }
    return val
  }

  Unparseable.parse = function () {}

  t.equal(Custom('cUsToM').value(), 'cUsToM')
  t.equal(Custom('stuff').or('Custom').value(), 'Custom')
  t.throws(() => Custom(365).value(), /Custom should be string/)
  t.throws(() => Custom('stuff').value(), /Custom should contain/)
  t.throws(() => Fail('stuff').or('bleh').value(), /No parser for fail/)
  t.throws(() => Fail('stuff').value(), /No parser for fail/)
  t.throws(() => Unparseable('any').value(), /Value any cannot be parsed as unparseable/)
  t.end()
})
