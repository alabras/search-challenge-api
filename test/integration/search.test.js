import request from 'supertest'
import app from '../../src/app'
import { initializeTest, stopTest } from './setupTest'
import palindromeResponse from '../mocks/palindromeResponse.json'
import notPalindromeResponse from '../mocks/notPalindromeResponse.json'
import notFoundResponse from '../mocks/notfoundResponse.json'
import searchByIdResponse from '../mocks/searchByIdResponse.json'

beforeAll(async () => {
  await initializeTest()
})
afterAll(async () => {
  await stopTest()
})

describe('integration test for search products', () => {
  it('should return list of products with discount when search palindrome', async () => {
    const response = await request(app).get('/api/search?q=dod')

    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual(palindromeResponse)
  })

  it('should return list of products without discount when search is not palindrome', async () => {
    const response = await request(app).get('/api/search?q=sad')

    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual(notPalindromeResponse)
  })

  it('should return 404 when search products not found', async () => {
    const response = await request(app).get('/api/search?q=not_found_product')

    expect(response.statusCode).toBe(404)
    expect(response.body).toStrictEqual(notFoundResponse)
  })

  it('should return last page when search with not found page', async () => {
    const response = await request(app).get('/api/search?q=sad&page=15')

    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual(notPalindromeResponse)
  })

  it('should return one result when search by id and without discount', async () => {
    const response = await request(app).get('/api/search?q=85')

    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual(searchByIdResponse)
  })
})
