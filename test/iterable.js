var opt = require('../')
var test = require('tape')

test('iterate', t => {
  t.deepEqual(opt('any').it().next().value, 'any')
  t.deepEqual(opt.boolean(true).it().next().value, true)
  t.deepEqual(opt.hash({}).it().next().value, {})
  t.deepEqual(opt.number(5).it().next().value, 5)
  t.deepEqual(opt.string('arf').it().next().value, 'arf')

  var it = opt.list(['one', 'two']).it()
  t.equal(it.next().value, 'one')
  t.equal(it.next().value, 'two')
  t.ok(it.next().done)

  t.throws(() => opt().it())
  t.throws(() => opt.list('arf').it())
  t.end()
})
