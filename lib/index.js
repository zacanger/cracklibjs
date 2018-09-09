const { readFileSync, readdirSync } = require('fs')
const { resolve } = require('path')
const flatten = require('zeelib/lib/flatten')
const uniq = require('zeelib/lib/uniq')
const keep = require('zeelib/lib/keep')

class PasswordValidationError extends Error {
  constructor (message) {
    super(message)
    this.name = 'PasswordValidationError'
  }
}

const buildWordList = (dictPath, files) =>
  keep(uniq(flatten(
    files.map((file) =>
      readFileSync(`${dictPath}/${file}`, 'utf8')
        .split('\n')))).sort())

const buildDefaultWordList = () =>
  buildWordList(resolve(__dirname), [ 'cracklib-small.txt' ])

const cracklib = ({
  dictPath = '/usr/share/dict',
  minLength = 8
} = {}) => (word = '') => {
  if (!word.length || /^\s+$/.test(word)) {
    throw new PasswordValidationError('Password is empty or all whitespace')
  }
  if (word.length < minLength) {
    throw new PasswordValidationError('Password is too short')
  }
  const files = readdirSync(dictPath)
  let words = buildWordList(dictPath, files)
  if (!words.length) {
    words = buildDefaultWordList()
  }
  if (words.includes(word)) {
    throw new PasswordValidationError('Password is too common')
  }
  return word
}

module.exports = cracklib
