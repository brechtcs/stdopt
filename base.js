var ERR_UNWRAP = 'Invalid optional value: '

module.exports = function base (valid) {
  return function some (val) {
    function or (fallback) {
      return some(valid(val) ? val : fallback)
    }

    function value () {
      if (valid(val)) {
        return val
      }
      throw new TypeError(ERR_UNWRAP + val)
    }

    function list () {
      return [value()]
    }

    return { or, value, list }
  }
}
