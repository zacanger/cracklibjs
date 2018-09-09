const tape = require('tape')
const crack = require('.')
const { resolve } = require('path')
const fakePath = resolve(__dirname, 'not-real.txt')

tape.test('foo', (t) => {
  const okWord = 'alksdfjlkj1232345sdlkjcs8!!'
  t.equals(crack()(okWord), okWord, 'random word is ok, no options')
  t.equals(crack({})(okWord), okWord, 'random word is ok, empty options')
  t.equals(typeof crack(), 'function', 'crack() returns a function')
  t.throws(() => crack({ minLength: 9 })('asdf11!!'), /Password is too short/, 'crack with minLength fails')
  t.throws(() => crack()(''), /Password is empty or all whitespace/, 'empty password fails')
  t.throws(() => crack()(), /Password is empty or all whitespace/, 'no password fails')
  t.throws(() => crack()('\t   \n'), /Password is empty or all whitespace/, 'whitespace password fails')
  t.throws(() => crack({ minLength: 2 })('one'), /Password is too common/, 'crack with "one" fails')
  t.throws(() => crack({ minLength: 2 })('eno'), /Password is too common/, 'crack with "eno" (reversed "one") fails')
  t.equals(crack({ dict: fakePath })(okWord), okWord, 'works with broken path')
  t.end()
})
