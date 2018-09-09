const tape = require('tape')
const crack = require('.')

tape.test('foo', (t) => {
  const okWord = 'alksdfjlkj1232345sdlkjcs8!!'
  t.equals(crack()(okWord), okWord, 'random word is ok')
  t.equals(typeof crack(), 'function', 'crack() returns a function')
  t.throws(() => crack({ minLength: 9 })('asdf11!!'), /Password is too short/, 'crack with minLength fails')
  t.throws(() => crack()(''), /Password is empty or all whitespace/, 'empty password fails')
  t.throws(() => crack()('\t   \n'), /Password is empty or all whitespace/, 'whitespace password fails')
  t.throws(() => crack({ minLength: 2 })('one'), /Password is too common/, 'crack with "one" fails')
  t.end()
})
