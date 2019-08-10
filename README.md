# cracklibjs

Pure JS Cracklib-inspired library for Node.

[![npm version](https://img.shields.io/npm/v/cracklibjs.svg)](https://npm.im/cracklibjs) [![CircleCI](https://circleci.com/gh/zacanger/cracklibjs.svg?style=svg)](https://circleci.com/gh/zacanger/cracklibjs) [![codecov](https://codecov.io/gh/zacanger/cracklibjs/branch/master/graph/badge.svg)](https://codecov.io/gh/zacanger/cracklibjs) [![Known Vulnerabilities](https://snyk.io/test/github/zacanger/cracklibjs/badge.svg?targetFile=package.json)](https://snyk.io/test/github/zacanger/cracklibjs?targetFile=package.json) [![Patreon](https://img.shields.io/badge/patreon-donate-yellow.svg)](https://www.patreon.com/zacanger) [![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/U7U2110VB)

--------

## Installation

`npm i cracklibjs`

## Usage

```javascript
const cracklib = require('cracklibjs')
const pw = process.argv[2] // or something

// Init with options. The wordlist is parsed here, so future calls
// don't have to do all that work again.
// `check: (word: string) => PasswordValidationError | string (word)`
const check = cracklib() // cracklib(options)
// The `options` param is optional.
// type Options = {
//   dict: string = '/usr/share/dict/words'; path to dictionary file
//   minLength: number = 8; minimum password length
//   loose: bool = false; see below for loose vs strict
// }

const validate = (pw) => {
  try {
    return check(pw)
  } catch (e) {
    return e.message // example: 'Password is too short'
  }
}
```

The `loose` option, when true, disables:
* Case-insensitive checks
* Reversed string checks
* md5, sha1, sha256, and sha512 checks

## Questions

* Why?
  * The npm package `cracklib` isn't a vanilla JS solution, has external
    dependencies, and may not build on all Unix-like systems and future versions
    of Node.
* I have more than one word list, what should I do?
  * Try [`cat(1)`](https://www.mankier.com/1/cat)
* This seems slow!
  * Don't initialize more than once. Initialization _can_ be slow, depending on
    your word list and your machine. Hopefully the actual check is fast.

## Patreon Sponsors

This project is sponsored on [Patreon](https://www.patreon.com/zacanger) by:

* [Keeley Hammond](https://github.com/VerteDinde)

## License

[MIT](./LICENSE.md)
