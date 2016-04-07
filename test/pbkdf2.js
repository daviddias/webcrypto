/* eslint-env mocha */
'use strict'

var expect = require('chai').expect
var crypto = require('../src')

var vectors = require('hash-test-vectors/pbkdf2')

describe('pbkdf2', function () {
  it('works', function () {
    vectors.forEach(function (input) {
      // skip inputs that will take way too long
      if (input.iterations > 10000) return

      var key = crypto.pbkdf2Sync(input.password, input.salt, input.iterations, input.length)

      if (key.toString('hex') !== input.sha1) {
        console.log(input)
      }

      expect(key.toString('hex')).to.be.eql(input.sha1)
    })
  })
})
