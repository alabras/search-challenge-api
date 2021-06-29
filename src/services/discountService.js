import { isPalindrome } from '../utils/palindrome'

const PALINDROME_DISCOUNT_PERCENT = 50
const discountService = (searchText, products) => {
  if (isPalindrome(searchText)) {
    products.map((item) => {
      item.basePrice = item.price
      item.discountPercent = PALINDROME_DISCOUNT_PERCENT
      item.price = item.basePrice * (PALINDROME_DISCOUNT_PERCENT / 100)
    })
  }
  return products
}

export default discountService
