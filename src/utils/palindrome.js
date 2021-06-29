const isPalindrome = (text) => {
  const excludeCharacters = /[\W_]/g
  const cleanText = text.toLowerCase().replace(excludeCharacters, '')
  var reverseText = cleanText.split('').reverse().join('')
  return reverseText === cleanText
}

export { isPalindrome }
