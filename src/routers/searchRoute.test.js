import app from '../app'
import request from 'supertest'
import searchStategy from '../services/searchService'
import { when } from 'jest-when'

jest.mock('../services/searchService')

describe('search Route', () => {
  it('should return 200 when search any text', async () => {
    when(searchStategy).calledWith('1e4').mockReturnValue([])
    const response = await request(app).get('/api/search?q=1e4')

    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual([])
  })

  it('should return 200 when search by id', async () => {
    when(searchStategy).calledWith('1').mockReturnValue([])
    const response = await request(app).get('/api/search?q=1')

    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual([])
  })

  it('should return 400 when search does contain text', async () => {
    const response = await request(app).get('/api/search')

    expect(response.statusCode).toBe(400)
    expect(response.body).toStrictEqual({ message: 'Debe ingresar algún texto para la busqueda', type: 'validation' })
  })

  it('should return 400 when length search text is less than 3', async () => {
    const response = await request(app).get('/api/search?q=a1')

    expect(response.statusCode).toBe(400)
    expect(response.body).toStrictEqual({
      message: 'Ingrese un texto de al menos 3 caracteres para realizar la busqueda',
      type: 'validation',
    })
  })
})
