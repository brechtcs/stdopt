var Base = require('./base')
var Boolean = Base.implement('boolean')

Boolean.parse = function (b) {
  if (typeof b === 'boolean') {
    return b
  }

  var str = String(b)
  switch (str.toLowerCase()) {
    case 'false': return false
    case 'true': return true
  }
}

module.exports = Boolean
