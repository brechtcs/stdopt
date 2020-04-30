var { hash, list, nothing, number, string } = require('../')
var { prop } = require('stdprop')
var Opt = require('../opt')
var test = require('tape')

class Custom extends Opt {
  static parse (val) {
    return val
  }
}

var Item = hash.struct({
  type: string,
  data: number
})

var Struct = {
  custom: Custom,
  description: string,
  extra: [nothing, string],
  items: list.of([nothing, Item])
}

var invalid = {
  custom: 1,
  description: 'invalid struct',
  items: [
    { type: 'valid', data: 1 },
    { type: 'invalid', data: 'two' }
  ]
}

var valid = {
  ping: 'pong',
  custom: new Custom(false),
  description: 'valid struct',
  items: [
    { type: 'some', data: '25' },
    { type: 'other', data: 8 },
    null
  ]
}

var expected = {
  custom: false,
  description: 'valid struct',
  items: [
    { type: 'some', data: 25 },
    { type: 'other', data: 8 },
    null
  ]
}

test('objects', t => {
  t.ok(list(['one', 'two'], string).isValid)
  t.ok(list(['one', true, 'three'], string).isError)
  t.deepEqual(list([1, 2], string).value(), ['1', '2'])
  t.deepEqual(hash(valid, Struct).value(), expected)
  t.throws(() => hash(invalid, Struct).value(), /items: \[1\]: data: Value two cannot be parsed as number/)

  var arr = list([1, 2, 3]).value()
  arr[1] = 'two'
  t.equal(arr[1], 2)
  t.throws(() => arr.push(4))

  var count = 0
  var struct = { hidden: number, prop: number }
  var input = {}
  prop(input, 'hidden', 8, 'w')
  prop(input, 'prop', 1, 'ew')
  var out = hash(input, struct).value()
  out.prop = 2
  t.equal(out.prop, 1)
  t.equal(out.hidden, 8)
  for (var key in out) {
    t.notOk(key === 'hidden')
    count++
  }
  t.equal(count, 1)
  t.end()
})
