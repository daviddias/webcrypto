/* eslint-env mocha */
'use strict'

var expect = require('chai').expect
var crypto = require('../src')

var randomBytesFunctions = {
  randomBytes: require('randombytes'),
  pseudoRandomBytes: crypto.pseudoRandomBytes
}

describe('random bytes', function () {
  Object.keys(randomBytesFunctions).forEach(function (randomBytesName) {
    // Both randomBytes and pseudoRandomBytes should provide the same interface
    var randomBytes = randomBytesFunctions[randomBytesName]

    it('get error message', function () {
      try {
        var b = randomBytes(10)
        expect(Buffer.isBuffer(b)).to.be.eql(true)
      } catch (err) {
        expect(
          err.message
        ).to.match(
            /not supported/
        )
      }
    })

    it(randomBytesName, function () {
      expect(randomBytes(10)).to.have.length(10)
      expect(Buffer.isBuffer(randomBytes(10))).to.be.eql(true)

      randomBytes(10, function (err, bytes) {
        expect(err).to.not.exist
        expect(bytes).to.have.length(10)
        expect(Buffer.isBuffer(bytes)).to.be.eql(true)
      })
    })

    it(randomBytesName + ' seem random', function () {
      var L = 1000
      var b = randomBytes(L)

      var mean = [].reduce.call(b, function (a, b) { return a + b }, 0) / L

      // test that the random numbers are plausably random.
      // Math.random() will pass this, but this will catch
      // terrible mistakes such as this blunder:
      // https://github.com/dominictarr/crypto-browserify/commit/3267955e1df7edd1680e52aeede9a89506ed2464#commitcomment-7916835

      // this doesn't check that the bytes are in a random *order*
      // but it's better than nothing.

      var expected = 256 / 2
      var smean = Math.sqrt(mean)

      // console.log doesn't work right on testling, *grumble grumble*
      // console.log(JSON.stringify([expected - smean, mean, expected + smean]))
      expect(mean < expected + smean).to.be.eql(true)
      expect(mean > expected - smean).to.be.eql(true)
    })
  })
})
