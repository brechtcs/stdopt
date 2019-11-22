var base = require('./base')

module.exports = base(function defined (val) {
  return val !== undefined && val !== null
})
