const { createHash } = require('crypto')
const { readFileSync } = require('fs')
const { resolve } = require('path')
const isFile = require('zeelib/lib/is-file').default

const uniq = (a) => [...new Set(a)]

class PasswordValidationError extends Error {
  constructor (message) {
    super(message)
    this.name = 'PasswordValidationError'
  }
}

const hashString = (method) =>
  (s = '') =>
    createHash(method).update(s).digest('hex')

const md5String = hashString('md5')
const sha1String = hashString('sha1')
const sha256String = hashString('sha256')
const sha512String = hashString('sha512')

const hashWord = (s = '') =>
  [md5String(s), sha1String(s), sha256String(s), sha512String(s)]

const buildWordList = (dict) =>
  readFileSync(dict, 'utf8').split('\n').filter((a) => a)

const reverseString = (s = '') =>
  s.split('').reverse().join('')

const buildDefaultWordList = () =>
  buildWordList(resolve(__dirname, 'cracklib-small.txt'))

const trim = (s = '') =>
  s.trim()

const normalize = (s = '') =>
  trim(s.toLowerCase())

const getWords = (dict, loose) => {
  const words = isFile(dict) ? buildWordList(dict) : buildDefaultWordList()
  const forward = (words.length ? words : buildDefaultWordList()).map(loose ? trim : normalize)
  if (loose) {
    return uniq(forward).sort()
  }
  const hashedWords = forward.map(hashWord)
  return uniq([...forward, ...forward.map(reverseString), ...hashedWords]).sort()
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
