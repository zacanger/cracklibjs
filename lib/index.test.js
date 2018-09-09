const tape = require('tape')
const check = require('.')

console.log(require('fs').readDirSync('/usr/share/dict'))
tape.test('foo', (t) => {
  const okWord = 'alksdfjlkj1232345sdlkjcs8!!'
  t.equals(check(okWord), okWord, 'random word is ok')
  t.throws(() => check('one'), /Your password is too common/, 'check with "one" fails')
  t.end()
})
