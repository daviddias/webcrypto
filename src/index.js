'use strict'

const isNode = require('detect-node')

if (isNode) {
  module.exports = require('crypto')
} else {
  module.exports = require('crypto-browserify')
}
