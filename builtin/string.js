var Opt = require('../opt')

function string (s) {
  Opt.call(this, s)
}

string.parse = function (s) {
  if (typeof s === 'string') {
    return s
  }
  if (typeof s === 'number' || s instanceof String) {
    return String(s)
  }
}

module.exports = Opt.construct(string)
