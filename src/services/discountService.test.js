const { default: discountService } = require('./discountService')

describe('discount service', () => {
  it('should be apply 50% discount when search text is palindrome', () => {
    const searchText = 'civic'
    const products = [
      {
        id: 1,
        brand: 'ooy eqrceli',
        description: 'rlñlw brhrka',
        image: 'www.lider.cl/catalogo/images/whiteLineIcon.svg',
        price: 498724,
      },
      {
        id: 2,
        brand: 'dsaasd',
        description: 'zlrwax bñyrh',
        image: 'www.lider.cl/catalogo/images/babyIcon.svg',
        price: 130173,
      },
    ]
    const resultProducts = discountService(searchText, products)

    expect(resultProducts[0].basePrice).toBe(498724)
    expect(resultProducts[0].discountPercent).toBe(50)
    expect(resultProducts[0].price).toBe(249362)

    expect(resultProducts[1].basePrice).toBe(130173)
    expect(resultProducts[1].discountPercent).toBe(50)
    expect(resultProducts[1].price).toBe(65086.5)
  })

  it('should not apply 50% discount when search text is not palindrome', () => {
    const searchText = 'another'
    const products = [
      {
        id: 1,
        brand: 'ooy eqrceli',
        description: 'rlñlw brhrka',
        image: 'www.lider.cl/catalogo/images/whiteLineIcon.svg',
        price: 498724,
      },
      {
        id: 2,
        brand: 'dsaasd',
        description: 'zlrwax bñyrh',
        image: 'www.lider.cl/catalogo/images/babyIcon.svg',
        price: 130173,
      },
    ]
    const resultProducts = discountService(searchText, products)

    expect(resultProducts[0].basePrice).not.toBeDefined()
    expect(resultProducts[0].discountPercent).not.toBeDefined()
    expect(resultProducts[0].price).toBe(498724)

    expect(resultProducts[1].basePrice).not.toBeDefined()
    expect(resultProducts[1].discountPercent).not.toBeDefined()
    expect(resultProducts[1].price).toBe(130173)
  })
})
