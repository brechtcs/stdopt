var base = require('./base')

module.exports = function (val) {
  var wrap = base(isNumber)
  return wrap(Number(val))
}

function isNumber (n) {
  return typeof n === 'number' && !Number.isNaN(n)
}
