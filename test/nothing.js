var { nothing } = require('../')
var test = require('tape')

test('nothing', t => {
  t.equal(nothing(null).value(), null)
  t.equal(nothing().value(), null)
  t.throws(() => nothing(0).value(), /Value 0 cannot be parsed as nothing/)
  t.end()
})
