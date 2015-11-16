var crypto = {
  isNode = !global.window,
  isWebCrypto = global.window && global.window.crypto
}

if (crypto.isNode) {
  crypto.Crypto = require('crypto')
} else {
  if (crypto.isWebCrypto) {
    crypto.Crypto = global.window.crypto
  } else {
    crypto.Crypto = require('crypto-browserify')
  }
}

module.exports = crypto
