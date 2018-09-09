const { readFileSync } = require('fs')
const { resolve } = require('path')
const uniq = require('zeelib/lib/uniq')
const keep = require('zeelib/lib/keep')
const reverse = require('zeelib/lib/reverse')
const isFile = require('zeelib/lib/is-file')

class PasswordValidationError extends Error {
  constructor (message) {
    super(message)
    this.name = 'PasswordValidationError'
  }
}

const buildWordList = (dict) =>
  keep(uniq(readFileSync(dict, 'utf8').split('\n')).sort())

const reverseString = (s = '') =>
  reverse(s).join('')

const buildDefaultWordList = () =>
  buildWordList(resolve(__dirname, 'cracklib-small.txt'))

const normalize = (s = '') =>
  s.toLowerCase().trim()

const getWords = (dict) => {
  const words = isFile(dict) ? buildWordList(dict) : buildDefaultWordList()
  const forward = (words.length ? words : buildDefaultWordList()).map(normalize)
  return uniq([ ...forward, ...forward.map(reverseString) ])
}

const cracklib = ({
  dict = '/usr/share/dict/words',
  minLength = 8
} = {}) => {
  const words = getWords(dict)
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
