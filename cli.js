#!/usr/bin/env node

const { args, hasFlag } = require('zrgs')
const check = require('./lib')
const exit = require('zeelib/lib/exit')

const usage = () => {
  console.log(`
    Usage:
    cracklibjs wordtocheck
`
  )
}

const main = () => {
  if (!args.length || hasFlag('help')) {
    usage()
    exit(0)
  } else if (args.length === 1) {
    console.log(check(args[0]))
  } else {
    usage()
    exit(1)
  }
}

main()
