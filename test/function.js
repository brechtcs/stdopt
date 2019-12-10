var { fn } = require('../')
var test = require('tape')

test('function', t => {
  t.ok(fn(function () {}).value().apply)
  t.ok(fn().or(() => true).value().apply)
  t.end()
})
