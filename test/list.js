var { list } = require('../')
var test = require('tape')

test('list', t => {
  t.deepEqual(list([]).value(), [])
  t.deepEqual(list({ 0: 1, length: 1 }).value(), [1])
  t.deepEqual(list('blerf').or([]).value(), ['blerf'])
  t.deepEqual(list(null).or([]).value(), [])
  t.deepEqual(list(null).or({ 0: 1, length: 1 }).value(), [1])
  t.throws(() => list().value(), /Value undefined cannot be parsed as list/)
  t.end()
})
