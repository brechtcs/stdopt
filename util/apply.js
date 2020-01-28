module.exports = function (Opt) {
  return new Proxy(Opt, {
    apply (Target, self, args) {
      return new Target(...args)
    }
  })
}
