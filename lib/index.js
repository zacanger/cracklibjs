const { readFileSync, readdirSync } = require('fs')
const { resolve } = require('path')
const flatten = require('zeelib/lib/flatten')
const uniq = require('zeelib/lib/uniq')

const buildWordList = (dictPath, files) =>
  uniq(flatten(
    files.map((file) =>
      readFileSync(`${dictPath}/${file}`, 'utf8')
        .split('\n')))).sort()

const buildDefaultWordList = () =>
  buildWordList(resolve(__dirname), [ 'cracklib-small.txt' ])

const cracklib = (word = '', {
  dictPath = '/usr/share/dict',
  minLength = 8
} = {}) => {
  if (!word.length || /^\s+$/.test(word)) {
    throw new Error('Password is empty or all whitespace')
  }
  if (word.length < minLength) {
    throw new Error('Password is too short')
  }
  const files = readdirSync(dictPath)
  let words = buildWordList(dictPath, files)
  if (!words.length) {
    words = buildDefaultWordList()
  }
  if (words.includes(word)) {
    throw new Error('Password is too common')
  }
  return word
}

module.exports = cracklib
