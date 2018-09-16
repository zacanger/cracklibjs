# cracklibjs

Pure JS Cracklib-inspired library for Node.

[![npm version](https://img.shields.io/npm/v/cracklibjs.svg)](https://npm.im/cracklibjs) [![CircleCI](https://circleci.com/gh/zacanger/cracklibjs.svg?style=svg)](https://circleci.com/gh/zacanger/cracklibjs) [![codecov](https://codecov.io/gh/zacanger/cracklibjs/branch/master/graph/badge.svg)](https://codecov.io/gh/zacanger/cracklibjs) [![Known Vulnerabilities](https://snyk.io/test/github/zacanger/cracklibjs/badge.svg?targetFile=package.json)](https://snyk.io/test/github/zacanger/cracklibjs?targetFile=package.json)

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
//   loose: bool = false; `true` will disable case-insensitive and reversed checks
// }

const validate = (pw) => {
  try {
    return check(pw)
  } catch (e) {
    return e.message // example: 'Password is too short'
  }
}
```

### CLI Usage

```
npm i -g cracklibjs
cracklibjs wordtocheck
```

None of the `options` work with the CLI yet.

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

## Todo

* Other complexity checks?
* General improvements
  * Convert to Flow or TS?
  * Make it faster?
* TS and Flow defs?
* Test on Win32?
* Make the options work with the CLI

## License

[MIT](./LICENSE.md)
