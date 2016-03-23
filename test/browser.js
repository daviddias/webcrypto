'use strict'

require('./create-hash')
require('./create-hmac')
require('./dh')

require('./pbkdf2')

var secure = true
try {
  require('randombytes')(8)
} catch (e) {
  secure = false
  console.log('no secure rng available')
}

if (secure) {
  require('./ecdh')
  require('./public-encrypt')
  require('./random-bytes')
  require('./sign')
}

require('./aes')
