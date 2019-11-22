var opt = require('../')
var test = require('tape')

test('opt', t => {
  t.equal(opt('value').value(), 'value')
  t.throws(opt().value, /Invalid optional value: undefined/)
  t.equal(opt('value').or('nope').value(), 'value')
  t.equal(opt().or('nope').value(), 'nope')
  t.equal(opt().or().or('nope').value(), 'nope')
  t.throws(opt().or(null).value, /Invalid optional value: null/)
  t.end()
})
