const { readFileSync, readdirSync } = require('fs')

const flatten = (xs) =>
  Array.isArray(xs) ? [].concat(...xs.map(flatten)) : xs

const uniq = (xs) =>
  [ ...new Set(xs) ]

const buildWordList = (dictPath, files) =>
  uniq(flatten(
    files.map((file) =>
      readFileSync(`${dictPath}/${file}`, 'utf8')
        .split('\n')))).sort()

const cracklib = (word, { dictPath = '/usr/share/dict' } = {}) => {
  const files = readdirSync(dictPath)
  const words = buildWordList(dictPath, files)
  return words.includes(word) ? new Error('Your password is too common!') : word
}

module.exports = cracklib
