var { hash, list, number, string } = require('../')
var test = require('tape')

var Item = hash.struct({
  type: string,
  data: number
})

var Struct = {
  description: string,
  items: list.of(Item)
}

var invalid = {
  description: 'invalid struct',
  items: [
    { type: 'valid', data: 1 },
    { type: 'invalid', data: 'two' }
  ]
}

var valid = {
  ping: 'pong',
  description: 'valid struct',
  items: [
    { type: 'some', data: '25' },
    { type: 'other', data: 8 }
  ]
}

var expected = {
  description: 'valid struct',
  items: [
    { type: 'some', data: 25 },
    { type: 'other', data: 8 }
  ]
}

test('types', t => {
  t.ok(list(['one', 'two'], string).isValid)
  t.ok(list(['one', true, 'three'], string).isError)
  t.deepEqual(list([1, 2], string).value(), ['1', '2'])
  t.deepEqual(hash(valid, Struct).value(), expected)
  t.throws(() => hash(invalid, Struct).value(), /items -> \[1\] -> data -> Value two cannot be parsed as number/)
  t.end()
})
