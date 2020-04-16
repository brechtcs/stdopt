var Base = require('./base')

function opt (val) {
  Base.call(this, val)
}

opt.parse = function (val) {
  if (val !== undefined && val !== null) {
    return val
  }
  return new Error('Value should be defined')
}

module.exports = Base.construct(opt)
