# stdopt

Wrap and validate optional values

## Usage

This package provides wrappers to check inputs and provide fallbacks. There is a general `some` wrapper to check if a value is defined or not, as well as a handful of others for various primitives. The chained syntax is more verbose than the standard JS way (i.e. `var str = opts.str || 'default'`), but it is more solid and predictable.

```js
var { some } = require('stdopt')
some('some data').value() // => 'some data'
some(null).or('other data').value() // => 'other data'
some(null).or(undefined).value() // => throws error

// string primitive
var { string } = require('stdopt')
string('some text').value() // => 'some text'
string(true).or('other text').value() // => 'other text'
string(5).value() // => '5'

// number primitive
var { number } = require('stdopt')
number(5).value() // => 5
number(true).or(7).value() // => 7
number('11').value() // => 11

// boolean primitive
var { boolean } = require('stdopt')
boolean(false).value() // => false
boolean(null).or(true).value() // => true
boolean('True').value() // => true
boolean('fAlSe').value() // => false

// hash primitive
var { hash } = require('stdopt')
hash({stuff: true}).value() // => {stuff: true}
hash(true).or({other: false}).value() // => {other: false}
hash([1, 2, 3]).value() // => throws error

// list primitive
var { list } = require('stdopt')
list([1, 2, 3]).value() // => [1, 2, 3]
list('one').value() // => ['one']
list(null).or([4, 5, 6]).value() // => [4, 5, 6]
list({0: 'stuff', length: 1}).value() // => ['stuff']
```

## Custom

You can also create your own custom primitives,  by using the `Opt` class and defining a custom static `parse` method.

```js
var Opt = require('stdopt')

function lowercase (value) {
  if (!(this instanceof lowercase)) {
    return new lowercase(value)
  }
  Opt.call(this, value)
}

lowercase.parse = function (value) {
  if (typeof value === 'string' && value.toLowerCase() === value) {
    return value.toLowerCase()
  }
}

lowercase('oh.').value() // => 'oh.'
lowercase('AHA!').or('oh.').value() // => 'oh.'
lowercase('AHA!').value() // => throws error
```

## License

Apache-2.0
