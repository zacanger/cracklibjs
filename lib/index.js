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

// faster includes
const includes = (item, xs) => {
  for (let i = 0, l = xs.length; i !== l; i++) {
    if (xs[i] === item) {
      return true
    }
  }
  return false
}

const buildWordList = (dict) =>
  keep(uniq(readFileSync(dict, 'utf8').split('\n')))

const reverseString = (s = '') =>
  reverse(s).join('')

const buildDefaultWordList = () =>
  buildWordList(resolve(__dirname, 'cracklib-small.txt'))

const trim = (s = '') =>
  s.trim()

const normalize = (s = '') =>
  trim(s.toLowerCase())

const getWords = (dict, loose) => {
  const words = isFile(dict) ? buildWordList(dict) : buildDefaultWordList()
  const forward = (words.length ? words : buildDefaultWordList()).map(loose ? trim : normalize)
  return loose ? uniq(forward).sort() : uniq([ ...forward, ...forward.map(reverseString) ]).sort()
}

const cracklib = ({
  dict = '/usr/share/dict/words',
  minLength = 8,
  loose = false
} = {}) => {
  const words = getWords(dict, loose)
  return (word = '') => {
    if (!word.length || /^\s+$/.test(word)) {
      throw new PasswordValidationError('Password is empty or all whitespace')
    }
    if (word.length < minLength) {
      throw new PasswordValidationError('Password is too short')
    }
    if (includes(word, words)) {
      throw new PasswordValidationError('Password is too common')
    }
    return word
  }
}

module.exports = cracklib
