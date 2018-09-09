# cracklibjs

WIP Pure JS Cracklib-like lib for Node.

--------

## Installation

`npm i cracklibjs`

## Usage

```javascript
const check = require('cracklibjs')
const pw = process.argv[2] // or something
check(pw)
```

## Why?

The npm package `cracklib` isn't a vanilla JS solution, has external
dependencies, and may not build on all Linux systems and future versions of
Node.

## License

[MIT](./LICENSE.md)
