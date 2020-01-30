var { opt, string } = require('../')
var test = require('tape')

test('nested', t => {
  t.equal(opt(opt('some')).value(), 'some')
  t.equal(opt(opt(opt('other'))).value(), 'other')
  t.equal(opt(string('value')).value(), 'value')
  t.throws(() => opt(string()).value(), /Value undefined cannot be parsed as string/)
  t.throws(() => string(opt()).value(), /Value should be defined/)
  t.end()
})
