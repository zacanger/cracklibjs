import { createHash } from 'crypto'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import isFile from 'zeelib/lib/is-file'

const uniq = <T>(a: Array<T>): Array<T> => [...new Set(a)]

export class PasswordValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'PasswordValidationError'
  }
}

type Method = 'md5' | 'sha1' | 'sha256' | 'sha512'

const hashString = (method: Method) => (s = ''): string =>
  createHash(method).update(s).digest('hex')

const md5String = hashString('md5')
const sha1String = hashString('sha1')
const sha256String = hashString('sha256')
const sha512String = hashString('sha512')

const hashWord = (s: string = ''): Array<string> => [
  md5String(s),
  sha1String(s),
  sha256String(s),
  sha512String(s),
]

const buildWordList = (dict: string): Array<string> =>
  readFileSync(dict, 'utf8')
    .split('\n')
    .filter((a) => a)

const reverseString = (s: string = ''): string => s.split('').reverse().join('')

const buildDefaultWordList = (): Array<string> =>
  buildWordList(resolve(__dirname, 'cracklib-small.txt'))

const trim = (s: string = ''): string => s.trim()

const normalize = (s: string = ''): string => trim(s.toLowerCase())

export const getWords = (dict: string, loose?: boolean): Array<string> => {
  const words = isFile(dict) ? buildWordList(dict) : buildDefaultWordList()
  const forward = (words.length ? words : buildDefaultWordList()).map(
    loose ? trim : normalize
  )
  if (loose) {
    return uniq(forward).sort()
  }
  const hashedWords = forward.map(hashWord)

  // @ts-ignore this is correct actually
  return uniq([
    ...forward,
    ...forward.map(reverseString),
    ...hashedWords,
  ]).sort()
}

// like a binary search
export const includes = (el: string, xs: Array<string>): boolean => {
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
