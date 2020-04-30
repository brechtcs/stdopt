var Opt = require('../opt')

function boolean (b) {
  Opt.call(this, b)
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

module.exports = Opt.construct(boolean)
