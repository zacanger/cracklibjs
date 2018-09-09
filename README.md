# cracklibjs

WIP Pure JS Cracklib-like lib for Node.

[![npm version](https://img.shields.io/npm/v/cracklibjs.svg)](https://npm.im/cracklibjs) [![CircleCI](https://circleci.com/gh/zacanger/cracklibjs.svg?style=svg)](https://circleci.com/gh/zacanger/cracklibjs) [![codecov](https://codecov.io/gh/zacanger/cracklibjs/branch/master/graph/badge.svg)](https://codecov.io/gh/zacanger/cracklibjs) [![Known Vulnerabilities](https://snyk.io/test/github/zacanger/cracklibjs/badge.svg?targetFile=package.json)](https://snyk.io/test/github/zacanger/cracklibjs?targetFile=package.json)

--------

## Installation

`npm i cracklibjs`

## Usage

```javascript
const check = require('cracklibjs')
const pw = process.argv[2] // or something
check(pw)
check(pw, options)
```

The second parameter `options` is optional.

```javascript
options = {
  dictPath: string = '/usr/share/dict'
  minLength: number = 8
}
```

### CLI Usage

```
npm i -g cracklibjs
cracklibjs wordtocheck
```

None of the `options` work with the CLI yet.

## Why?

The npm package `cracklib` isn't a vanilla JS solution, has external
dependencies, and may not build on all Linux systems and future versions of
Node.

## Todo

* Length
* Reverse
* Hash
* Other complexity checks?
* Make it fast
* Make it better
* TS and Flow defs?
* Make it work in the browser somehow?

## License

[MIT](./LICENSE.md)
