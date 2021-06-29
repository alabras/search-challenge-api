import { when } from 'jest-when'
import { findById, findByBrandDescription } from '../repositories/productsRepository'
import searchStategy from './searchService'
import searchByIdResult from '../../test/mocks/searchById.json'
import searchByStringResult from '../../test/mocks/searchByString.json'

jest.mock('../repositories/productsRepository')

describe('search Service', () => {
  beforeEach(() => {
    findById.mockClear()
    findByBrandDescription.mockClear()
  })
  it('should return empty array when search by string', async () => {
    const cursorResult = {
      toArray: () => {
        return []
      },
    }
    const searchText = 'asd'
    when(findByBrandDescription).calledWith(searchText).mockReturnValue(cursorResult)

    const result = await searchStategy(searchText)

    expect(result).toStrictEqual([])
    expect(findById).not.toBeCalled()
    expect(findByBrandDescription).toBeCalledTimes(1)
  })

  it('should return one element when search by int', async () => {
    const searchText = '123'
    when(findById).calledWith(123).mockReturnValue(searchByIdResult)
    const result = await searchStategy(searchText)

    expect(result).toStrictEqual([searchByIdResult])
    expect(findByBrandDescription).not.toBeCalled()
    expect(findById).toBeCalledTimes(1)
  })

  it('should return array objects when find by string with numbers', async () => {
    const searchText = '1es4'
    const cursorResult = {
      toArray: () => {
        return searchByStringResult
      },
    }
    when(findByBrandDescription).calledWith(searchText).mockReturnValue(cursorResult)

    const result = await searchStategy(searchText)

    expect(result).toStrictEqual(searchByStringResult)
    expect(findById).not.toBeCalled()
    expect(findByBrandDescription).toBeCalledTimes(1)
  })

  it('should return array objects when find only string', async () => {
    const searchText = 'test'
    const cursorResult = {
      toArray: () => {
        return searchByStringResult
      },
    }
    when(findByBrandDescription).calledWith(searchText).mockReturnValue(cursorResult)

    const result = await searchStategy(searchText)

    expect(result).toStrictEqual(searchByStringResult)
    expect(findById).not.toBeCalled()
    expect(findByBrandDescription).toBeCalledTimes(1)
  })

  it('should return emtpy array when search by int does not return results', async () => {
    const searchText = '123'
    when(findById).calledWith(123).mockReturnValue(null)
    const result = await searchStategy(searchText)

    expect(result).toStrictEqual([])
    expect(findById).toBeCalledTimes(1)
    expect(findByBrandDescription).not.toBeCalled()
  })
})
