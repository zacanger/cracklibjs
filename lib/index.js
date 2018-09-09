const { readFileSync, readdirSync } = require('fs')
const { resolve } = require('path')
const flatten = require('zeelib/lib/flatten')
const uniq = require('zeelib/lib/uniq')
const keep = require('zeelib/lib/keep')
const reverse = require('zeelib/lib/reverse')
const isDirectory = require('zeelib/lib/is-directory')

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

const reverseString = (s = '') =>
  reverse(s).join('')

const buildDefaultWordList = () =>
  buildWordList(resolve(__dirname), [ 'cracklib-small.txt' ])

const getWords = (dictPath) => {
  if (!isDirectory(dictPath)) {
    return buildDefaultWordList()
  }

  const files = readdirSync(dictPath)
  if (!files) {
    return buildDefaultWordList()
  }

  const words = buildWordList(dictPath, files)
  const forward = words.length ? words : buildDefaultWordList()
  return [ ...forward, ...forward.map(reverseString) ]
}

const cracklib = ({
  dictPath = '/usr/share/dict',
  minLength = 8
} = {}) => {
  const words = getWords(dictPath)
  return (word = '') => {
    if (!word.length || /^\s+$/.test(word)) {
      throw new PasswordValidationError('Password is empty or all whitespace')
    }
    if (word.length < minLength) {
      throw new PasswordValidationError('Password is too short')
    }
    if (words.includes(word)) {
      throw new PasswordValidationError('Password is too common')
    }
    return word
  }
}

module.exports = cracklib
