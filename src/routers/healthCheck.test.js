import app from '../app'
import request from 'supertest'

describe('healt Check route', () => {
  it('should return 200', async () => {
    process.env.LIST_CORS_URL = '/'
    const response = await request(app).get('/api/health')

    expect(response.statusCode).toBe(200)
    expect(response.text).toBe('OK')
  })

  it('should not have x-power header', async () => {
    const response = await request(app).get('/api/health')

    expect(response.headers['x-powered-by']).toBeUndefined()
  })

  it('should be have security headers', async () => {
    const response = await request(app).get('/api/health')

    expect(response.headers['x-frame-options']).toBe('SAMEORIGIN')
    expect(response.headers['x-xss-protection']).toBe('0')
    expect(response.headers['x-content-type-options']).toBe('nosniff')
    expect(response.headers['strict-transport-security']).toBe(
      'max-age=15552000; includeSubDomains',
    )
    expect(response.headers['referrer-policy']).toBe('no-referrer')
  })
})
