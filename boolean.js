var Base = require('./base')

function boolean (b) {
  Base.call(this, b)
}

boolean.parse = function (b) {
  if (typeof b === 'boolean') {
    return b
  }

  var str = String(b)
  switch (str.toLowerCase()) {
    case 'false': return false
    case 'true': return true
  }
}

module.exports = Base.construct(boolean)
