import { when } from 'jest-when'
import paginateService from './paginateService'

const cursorResult = {
  toArray: jest.fn(),
  cursorState: {},
  count: jest.fn(),
  skip: jest.fn(),
  limit: jest.fn(),
}

describe('test paginate service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should return paginate object when search is not cursor', async () => {
    const result = await paginateService([], 1)

    expect(result).toStrictEqual({ products: [], page: 1, totalPages: 1 })
  })

  it('should calculate correctly pages when search is cursor and count is number rounded', async () => {
    cursorResult.count.mockResolvedValue(16)
    when(cursorResult.skip).calledWith(0).mockReturnValue(cursorResult)
    when(cursorResult.limit).calledWith(10).mockReturnValue(cursorResult)
    cursorResult.toArray.mockResolvedValue([])

    const result = await paginateService(cursorResult, 1)

    expect(result).toStrictEqual({ products: [], page: 1, totalPages: 2 })
  })

  it('should calculate correctly pages when search is cursor', async () => {
    cursorResult.count.mockResolvedValue(12)
    when(cursorResult.skip).calledWith(0).mockReturnValue(cursorResult)
    when(cursorResult.limit).calledWith(10).mockReturnValue(cursorResult)
    cursorResult.toArray.mockResolvedValue([])

    const result = await paginateService(cursorResult, 1)

    expect(result).toStrictEqual({ products: [], page: 1, totalPages: 2 })
  })

  it('should calculate correctly pages when division remainder is zero', async () => {
    cursorResult.count.mockResolvedValue(30)
    when(cursorResult.skip).calledWith(10).mockReturnValue(cursorResult)
    when(cursorResult.limit).calledWith(20).mockReturnValue(cursorResult)
    cursorResult.toArray.mockResolvedValue([])

    const result = await paginateService(cursorResult, 2)

    expect(result).toStrictEqual({ products: [], page: 2, totalPages: 3 })
  })

  it('should return last page when page is greater than exists ones', async () => {
    cursorResult.count.mockResolvedValue(30)
    when(cursorResult.skip).calledWith(20).mockReturnValue(cursorResult)
    when(cursorResult.limit).calledWith(30).mockReturnValue(cursorResult)
    cursorResult.toArray.mockResolvedValue([])

    const result = await paginateService(cursorResult, 6)

    expect(result).toStrictEqual({ products: [], page: 3, totalPages: 3 })
  })

  it('should emtpy products when does exists results', async () => {
    cursorResult.count.mockResolvedValue(0)

    const result = await paginateService(cursorResult, 6)

    expect(result).toStrictEqual({ products: [], page: 0, totalPages: 0 })
  })
})
