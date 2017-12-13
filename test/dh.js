/* eslint-env mocha */
'use strict'

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect
chai.use(dirtyChai)

var crypto = require('../src')

describe('diffie-hellman', function () {
  describe('mod groups', function () {
    [
      'modp1', 'modp2', 'modp5', 'modp14', 'modp15', 'modp16'
    ].forEach(function (mod) {
      it(mod, function () {
        this.timeout(20 * 1000)
        var dh1 = crypto.getDiffieHellman(mod)
        var p1 = dh1.getPrime().toString('hex')
        dh1.generateKeys()
        var dh2 = crypto.getDiffieHellman(mod)
        var p2 = dh2.getPrime().toString('hex')
        dh2.generateKeys()
        expect(p1).to.be.eql(p2)

        var pubk1 = dh1.getPublicKey()
        var pubk2 = dh2.getPublicKey()
        expect(pubk1).to.not.be.eql(pubk2)

        var pub1 = dh1.computeSecret(pubk2).toString('hex')
        var pub2 = dh2.computeSecret(dh1.getPublicKey()).toString('hex')
        expect(pub1).to.be.eql(pub2)
      })
    })
  })

  describe('key lengths', function () {
    [
      64, 65, 192
    ].forEach(function (len) {
      it(String(len), function () {
        var dh2 = crypto.createDiffieHellman(len)
        var prime2 = dh2.getPrime()
        var p2 = prime2.toString('hex')
        var dh1 = crypto.createDiffieHellman(prime2)
        var p1 = dh1.getPrime().toString('hex')
        dh1.generateKeys()
        dh2.generateKeys()
        expect(p1).to.be.eql(p2)

        var pubk1 = dh1.getPublicKey()
        var pubk2 = dh2.getPublicKey()
        expect(pubk1).to.not.be.eql(pubk2)

        var pub1 = dh1.computeSecret(pubk2).toString('hex')
        var pub2 = dh2.computeSecret(dh1.getPublicKey()).toString('hex')
        expect(pub1).to.be.eql(pub2)
      })
    })
  })
})
