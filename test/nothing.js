var { some, nothing } = require('../')
var test = require('tape')

test('nothing', t => {
  t.equal(nothing(null).value(), null)
  t.equal(nothing().value(), null)
  t.equal(some().or(nothing).value(), null)
  t.equal(nothing(0).or(some, 1).value(), 1)
  t.throws(() => nothing(0).value(), /Value 0 cannot be parsed as nothing/)
  t.end()
})
