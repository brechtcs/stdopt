var Base = require('./base')
var apply = require('./util/apply')

function opt (val) {
  Base.call(this, val)
}

opt.parse = function (val) {
  if (val !== undefined && val !== null) {
    return val
  }
  return new Error('Value should be defined')
}

module.exports = apply(opt)
