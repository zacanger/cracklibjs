import { getWords, includes, PasswordValidationError } from './util'

const cracklib = ({
  dict = '/usr/share/dict/words',
  minLength = 8,
  loose = false,
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

export default cracklib
