import { isPalindrome } from './palindrome'

describe('test for palindrome', () => {
  test.concurrent.each([
    'redivider',
    'deified',
    'civic',
    'radar',
    'level',
    'rotor',
    'kayak',
    'reviver',
    'racecar',
    'madam',
    'refer',
    'Mr. Owl ate my metal worm',
    'Do geese see God',
    'Murder for a jar of red rum',
  ])('should return true when check %s isPalindrome', async (text) => {
    const result = isPalindrome(text)
    expect(result).toBeTruthy()
  })

  test.concurrent.each([
    'there',
    'have',
    'palindromes',
    'related',
    'competitions',
    'been',
    'where',
    'Taylor had also composed two other',
    'The characters read',
    'gateway',
  ])('should return false when check %s isPalindrome', async (text) => {
    const result = isPalindrome(text)
    expect(result).toBeFalsy()
  })
})
