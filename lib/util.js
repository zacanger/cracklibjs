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
  keep(readFileSync(dict, 'utf8').split('\n'))

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

// like a binary search
const includes = (el, xs) => {
  // i have no idea how efficient native includes actually is.
  // probably a linear search though?
  if (xs.length < 500) {
    return xs.includes(el)
  }

  let minIndex = 0
  let maxIndex = xs.length - 1
  let currentIndex
  let currentElement

  while (minIndex <= maxIndex) {
    currentIndex = Math.floor((minIndex + maxIndex) / 2)
    currentElement = xs[currentIndex]

    if (currentElement < el) {
      minIndex = currentIndex + 1
    } else if (currentElement > el) {
      maxIndex = currentIndex - 1
    } else {
      return true
    }
  }

  return false
}

module.exports = {
  PasswordValidationError,
  includes,
  getWords
}
