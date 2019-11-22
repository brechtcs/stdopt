var { list } = require('../')
var test = require('tape')

test('list', t => {
  t.deepEqual(list([]).value(), [])
  t.deepEqual(list({ 0: 1, length: 1 }).value(), [1])
  t.deepEqual(list('blerf').or([]).value(), [])
  t.deepEqual(list('blerf').or({ 0: 1, length: 1 }).value(), [1])
  t.end()
})
