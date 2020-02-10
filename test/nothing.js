var { opt, nothing } = require('../')
var test = require('tape')

test('nothing', t => {
  t.equal(nothing(null).value(), null)
  t.equal(nothing().value(), null)
  t.equal(opt().or(nothing).value(), null)
  t.equal(nothing(0).or(opt, 1).value(), 1)
  t.throws(() => nothing(0).value(), /Value 0 cannot be parsed as nothing/)
  t.end()
})
