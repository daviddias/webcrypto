/* eslint-env mocha */
'use strict'

var expect = require('chai').expect
var _crypto = require('../src')

var createECDH1 = _crypto.createECDH
var createECDH2 = _crypto.createECDH
var mods = [
  'secp256k1',
  'secp224r1',
  'prime256v1',
  'prime192v1'
]

describe('createECDH', function () {
  mods.forEach(function (mod) {
    it(mod + ' uncompressed', function () {
      var dh1 = createECDH1(mod)
      dh1.generateKeys()
      var dh2 = createECDH2(mod)
      dh2.generateKeys()
      var pubk1 = dh1.getPublicKey()
      var pubk2 = dh2.getPublicKey()
      expect(pubk1.toString('hex')).to.not.be.eql(pubk2.toString('hex'))
      var pub1 = dh1.computeSecret(pubk2).toString('hex')
      var pub2 = dh2.computeSecret(pubk1).toString('hex')
      expect(pub1).to.be.eql(pub2)
    })

    it(mod + ' compressed', function () {
      var dh1 = createECDH1(mod)
      dh1.generateKeys()
      var dh2 = createECDH2(mod)
      dh2.generateKeys()
      var pubk1 = dh1.getPublicKey(null, 'compressed')
      var pubk2 = dh2.getPublicKey(null, 'compressed')
      expect(pubk1.toString('hex')).to.not.be.eql(pubk2.toString('hex'))
      var pub1 = dh1.computeSecret(pubk2).toString('hex')
      var pub2 = dh2.computeSecret(pubk1).toString('hex')
      expect(pub1).to.be.eql(pub2)
    })

    it(mod + ' set stuff', function () {
      var dh1 = createECDH1(mod)
      var dh2 = createECDH2(mod)
      dh1.generateKeys()
      dh2.generateKeys()
      dh1.setPrivateKey(dh2.getPrivateKey())
      dh1.setPublicKey(dh2.getPublicKey())
      var priv1 = dh1.getPrivateKey('hex')
      var priv2 = dh2.getPrivateKey('hex')
      expect(priv1).to.be.eql(priv2)
      var pubk1 = dh1.getPublicKey()
      var pubk2 = dh2.getPublicKey()
      expect(pubk1.toString('hex')).to.be.eql(pubk2.toString('hex'))
      expect(dh1.getPublicKey('hex', 'compressed')).to.be.eql(dh2.getPublicKey('hex', 'compressed'))
      expect(dh1.getPublicKey('hex', 'hybrid')).to.be.eql(dh2.getPublicKey('hex', 'hybrid'))
      var pub1 = dh1.computeSecret(pubk2).toString('hex')
      var pub2 = dh2.computeSecret(pubk1).toString('hex')
      expect(pub1).to.be.eql(pub2)
    })
  })
})
