webcrypto
=========

[![](https://img.shields.io/badge/made%20by-Protocol%20Labs-blue.svg?style=flat-square)](http://ipn.io)
[![](https://img.shields.io/badge/project-IPFS-blue.svg?style=flat-square)](http://ipfs.io/)
[![](https://img.shields.io/badge/freenode-%23ipfs-blue.svg?style=flat-square)](http://webchat.freenode.net/?channels=%23ipfs)
[![Coverage Status](https://coveralls.io/repos/github/diasdavid/webcrypto/badge.svg?branch=master)](https://coveralls.io/github/diasdavid/webcrypto?branch=master)
[![Travis CI](https://travis-ci.org/diasdavid/webcrypto.svg?branch=master)](https://travis-ci.org/diasdavid/webcrypto)
[![Circle CI](https://circleci.com/gh/diasdavid/webcrypto.svg?style=svg)](https://circleci.com/gh/diasdavid/webcrypto)
[![Dependency Status](https://david-dm.org/diasdavid/webcrypto.svg?style=flat-square)](https://david-dm.org/diasdavid/webcrypto) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)

> WebCryptoAPI polyfil to work in Node.js in the Browser (so that you don't have to be concerned about moving crypto code between a browser and server side app)

## Roadmap

- [x] Expose the Node.js crypto module interface
- [x] Use crypto-browserify to make it work in the browser
- [ ] Replace crypto-browserify with WebCryptoAPI when browser supports it
- [ ] Consider if we should replace the functions that TweetNaCL offers for perf/or and stability improvements

## API

This module should follow at all times the Node.js Crypto API https://nodejs.org/api/crypto.html

## Tests

This module is using tests from crypto-browserify to validate that the expectations remain fulfilled
