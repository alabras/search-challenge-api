import app from '../app'
import request from 'supertest'
import { when } from 'jest-when'
import discountService from '../services/discountService'
import paginateService from '../services/paginateService'
import searchStategy from '../services/searchService'
import searchByString from '../../test/mocks/searchByString.json'
import searchById from '../../test/mocks/searchById.json'

jest.mock('../services/searchService')
jest.mock('../services/paginateService')
jest.mock('../services/discountService')

describe('search Route', () => {
  beforeEach(() => {
    process.env.LIST_CORS_URL = '/'
    searchStategy.mockClear()
    paginateService.mockClear()
    discountService.mockClear()
  })
  it('should return 200 when search contain results and search any text', async () => {
    when(searchStategy).calledWith('1e4').mockReturnValue({})
    when(paginateService).calledWith({}, 1).mockReturnValue({ products: searchByString })
    when(discountService)
      .calledWith('1e4', searchByString)
      .mockReturnValue(searchByString)
    const response = await request(app).get('/api/search?q=1e4')

    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual({ products: searchByString })
  })

  it('should return 404 when search does contain results', async () => {
    when(searchStategy).calledWith('1e4').mockReturnValue([])
    when(paginateService).calledWith([], 1).mockReturnValue({ products: [] })
    when(discountService).calledWith('1e4', []).mockReturnValue([])
    const response = await request(app).get('/api/search?q=1e4')

    expect(response.statusCode).toBe(404)
    expect(response.body).toStrictEqual({
      message: 'No existen resultados para la busqueda 1e4',
    })
  })

  it('should return 200 when page is greater than existing ones', async () => {
    when(searchStategy).calledWith('1e4').mockReturnValue([])
    when(paginateService)
      .calledWith([], 5)
      .mockReturnValue({ products: searchByString, page: 1 })
    when(discountService)
      .calledWith('1e4', searchByString)
      .mockReturnValue(searchByString)
    const response = await request(app).get('/api/search?q=1e4&page=5')

    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual({ products: searchByString, page: 1 })
  })

  it('should return 200 when search by id', async () => {
    const productResult = { products: [searchById] }
    when(searchStategy).calledWith('1').mockReturnValue({})
    when(paginateService).calledWith({}, 1).mockReturnValue(productResult)
    when(discountService)
      .calledWith('1', productResult.products)
      .mockReturnValue(productResult.products)
    const response = await request(app).get('/api/search?q=1')

    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual(productResult)
  })

  it('should return 400 when search does contain text', async () => {
    const response = await request(app).get('/api/search')

    expect(response.statusCode).toBe(400)
    expect(response.body).toStrictEqual({
      message: 'Debe ingresar algún texto para la busqueda',
      type: 'validation',
    })
  })

  it('should return 400 when length search text is less than 3', async () => {
    const response = await request(app).get('/api/search?q=a1')

    expect(response.statusCode).toBe(400)
    expect(response.body).toStrictEqual({
      message: 'Ingrese un texto de al menos 3 caracteres para realizar la busqueda',
      type: 'validation',
    })
  })

  it('should set page equal 1 when page is string', async () => {
    when(searchStategy).calledWith('1').mockReturnValue({})

    await request(app).get('/api/search?q=1')

    expect(paginateService).toHaveBeenCalledWith({}, 1)
  })

  it('should parse page correctly', async () => {
    when(searchStategy).calledWith('11').mockReturnValue({})

    await request(app).get('/api/search?q=11&page=22')

    expect(paginateService).toHaveBeenCalledWith({}, 22)
  })

  it('should parse page to 1 when page is any string', async () => {
    when(searchStategy).calledWith('1').mockReturnValue({})

    await request(app).get('/api/search?q=1&page=2Dd4')

    expect(paginateService).toHaveBeenCalledWith({}, 1)
  })
})
