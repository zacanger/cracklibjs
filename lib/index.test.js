const tape = require('tape')
const check = require('.')

tape.test('foo', (t) => {
  const okWord = 'alksdfjlkj1232345sdlkjcs8!!'
  t.equals(check()(okWord), okWord, 'random word is ok')
  t.throws(() => check({ minLength: 9 })('asdf11!!'), /Password is too short/, 'check with minLength fails')
  t.throws(() => check()(''), /Password is empty or all whitespace/, 'empty password fails')
  t.throws(() => check()('\t   \n'), /Password is empty or all whitespace/, 'whitespace password fails')
  t.throws(() => check({ minLength: 2 })('one'), /Password is too common/, 'check with "one" fails')
  t.end()
})
