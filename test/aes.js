/* eslint-env mocha */
'use strict'

var expect = require('chai').expect
var randomBytes = require('pseudorandombytes')
var crypto = require('../src')

function runIt (i) {
  /*
  crypto.listCiphers().forEach(function (cipher) {
    describe('run: ' + i, function () {
      it('ciphers: ' + cipher, function () {
        var data = randomBytes(562)
        var password = randomBytes(20)
        var crypter = crypto.createCipher(cipher, password)
        var decrypter = crypto.createDecipher(cipher, password)
        var out = []
        out.push(decrypter.update(crypter.update(data)))
        out.push(decrypter.update(crypter.final()))
        if (cipher.indexOf('gcm') > -1) {
          decrypter.setAuthTag(crypter.getAuthTag())
        }
        out.push(decrypter.final())
        expect(data.toString('hex')).to.be.eql(, Buffer.concat(out).toString('hex'))
      })
    })
  })
  if (i < 4) {
    setTimeout(runIt, 0, i + 1)
  }
  */
}
runIt(1)
describe('aes', function () {
  it('getCiphers', function () {
    expect(crypto.getCiphers()).to.not.be.empty
  })

  it('through crypto browserify works', function () {
    var cipher = 'aes-128-ctr'
    var data = randomBytes(562)
    var password = randomBytes(20)
    var crypter = crypto.createCipher(cipher, password)
    var decrypter = crypto.createDecipher(cipher, password)
    var out = []
    out.push(decrypter.update(crypter.update(data)))
    out.push(decrypter.update(crypter.final()))
    out.push(decrypter.final())
    expect(
      data.toString('hex')
    ).to.be.eql(
      Buffer.concat(out).toString('hex')
    )
    expect(crypto.getCiphers()).to.not.be.empty
  })
})
