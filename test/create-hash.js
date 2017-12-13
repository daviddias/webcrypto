/* eslint-env mocha */
'use strict'

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect
chai.use(dirtyChai)

var algorithms = ['sha1', 'sha224', 'sha256', 'sha384', 'sha512', 'md5', 'rmd160']
var encodings = ['hex', 'base64'] // FIXME: test binary
var vectors = require('hash-test-vectors')

describe('createHash', function () {
  testLib('in crypto-browserify', require('../src').createHash)

  function testLib (name, createHash) {
    algorithms.forEach(function (algorithm) {
      runTest(name, createHash, algorithm)
    })
  }

  function runTest (name, createHash, algorithm) {
    it(name + ' test ' + algorithm + ' against test vectors', function (done) {
      run(0)
      function run (i) {
        if (i >= vectors.length) {
          return done()
        }
        var obj = vectors[i]

        var input = Buffer.from(obj.input, 'base64')
        var node = obj[algorithm]
        var js = createHash(algorithm).update(input).digest('hex')
        expect(js).to.be.eql(node)

        encodings.forEach(function (encoding) {
          var input = Buffer.from(obj.input, 'base64').toString(encoding)
          var node = obj[algorithm]
          var js = createHash(algorithm).update(input, encoding).digest('hex')
          expect(js).to.be.eql(node)
        })
        input = Buffer.from(obj.input, 'base64')
        node = obj[algorithm]
        var hash = createHash(algorithm)
        hash.end(input)
        js = hash.read().toString('hex')
        expect(js).to.be.eql(node)

        setTimeout(run, 0, i + 1)
      }
    })
  }
})
