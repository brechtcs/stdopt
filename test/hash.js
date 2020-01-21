var { hash } = require('../')
var test = require('tape')

test('hash', t => {
  t.deepEqual(hash({}).value(), {})
  t.deepEqual(hash('barf').or({}).value(), {})
  t.deepEqual(hash([]).or({}).value(), {})
  t.deepEqual(hash({ 0: 1, length: 1 }).or({}).value(), {})
  t.deepEqual(hash({ length: 1 }).value(), { length: 1 })
  t.throws(() => hash([1, 2]).value(), /Value 1,2 is a list, should be hash/)
  t.throws(() => hash('no').value(), /Value no cannot be parsed as hash/)
  t.end()
})
