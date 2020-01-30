var { hash } = require('../')
var test = require('tape')

test('hash', t => {
  t.deepEqual(hash({}).value(), {})
  t.deepEqual(hash('barf').or({}).value(), {})
  t.deepEqual(hash([]).or({}).value(), [])
  t.deepEqual(hash({ length: 1 }).value(), { length: 1 })
  t.throws(() => hash('no').value(), /Value no cannot be parsed as hash/)
  t.end()
})
