var { some, string } = require('../')
var test = require('tape')

test('nested', t => {
  t.equal(some(some('some')).value(), 'some')
  t.equal(some(some(some('other'))).value(), 'other')
  t.equal(some(string('value')).value(), 'value')
  t.throws(() => some(string()).value(), /Value undefined cannot be parsed as string/)
  t.throws(() => string(some()).value(), /Value should be defined/)
  t.end()
})
