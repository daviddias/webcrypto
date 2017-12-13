/* eslint-env mocha */
'use strict'

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect
chai.use(dirtyChai)

var algorithms = ['sha1', 'sha224', 'sha256', 'sha384', 'sha512', 'md5', 'rmd160']
var vectors = require('hash-test-vectors/hmac')

describe('createHmac', function () {
  testLib('in crypto-browserify', require('../src').createHmac)

  function testLib (name, createHmac) {
    algorithms.forEach(function (alg) {
      it(name + ' hmac(' + alg + ')', function (done) {
        run(0)
        function run (i) {
          if (i >= vectors.length) {
            return done()
          }
          var input = vectors[i]
          var output = createHmac(alg, Buffer.from(input.key, 'hex'))
            .update(input.data, 'hex').digest()

          output = input.truncate ? output.slice(0, input.truncate) : output
          output = output.toString('hex')
          expect(output).to.be.eql(input[alg])
          setTimeout(run, 0, i + 1)
        }
      })

      it('hmac(' + alg + ')', function (done) {
        run(0)
        function run (i) {
          if (i >= vectors.length) {
            return done()
          }
          var input = vectors[i]
          var hmac = createHmac(alg, Buffer.from(input.key, 'hex'))

          hmac.end(input.data, 'hex')
          var output = hmac.read()

          output = input.truncate ? output.slice(0, input.truncate) : output
          output = output.toString('hex')
          expect(output).to.be.eql(input[alg])
          setTimeout(run, 0, i + 1)
        }
      })
    })
  }
})
