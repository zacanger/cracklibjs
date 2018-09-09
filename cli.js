#!/usr/bin/env node

const { args, hasFlag } = require('zrgs')
const check = require('./lib')
const exit = require('zeelib/lib/exit')

const usage = () => {
  console.log(`
    Usage:
    cracklibjs wordtocheck
    cracklibjs --dict-path /path/to-dict/directory wordtocheck
`
  )
}

const main = () => {
  if (!args.length || hasFlag('help')) {
    usage()
    exit(0)
  } else if (hasFlag('dict-path')) {
    const dictPath = args[1]
    const word = args[2]
    check(word, { dictPath })
  } else if (args.length === 1) {
    console.log(check(args[0]))
  } else {
    usage()
    exit(1)
  }
}

main()
