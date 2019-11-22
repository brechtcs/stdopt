var base = require('./base')

module.exports = function boolean (val) {
  var wrap = base(isBoolean)
  var box = wrap(val)

  function or (fallback) {
    return boolean(isBoolean(val) ? val : fallback)
  }

  function value () {
    var str = box.value().toString()
    switch (str.toLowerCase()) {
      case 'false': return false
      case 'true': return true
      default: throw new Error('Illegal state')
    }
  }

  return { or, value }
}

function isBoolean (b) {
  if (typeof b !== 'string') {
    return b === false || b === true
  }
  return b.toLowerCase() === 'false' || b.toLowerCase() === 'true'
}
