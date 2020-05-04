var VError = require('verror')

class OptError extends VError {
  constructor (err, message) {
    super(err, message)

    this.name = this.constructor.name

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error(message)).stack
    }
  }
}

module.exports = OptError
