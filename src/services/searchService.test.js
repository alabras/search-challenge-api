import { when } from 'jest-when'
import { findById, findByBrandDescription } from '../repositories/productsRepository'
import searchStategy from './searchService'
import searchByIdResult from '../../test/mocks/searchById.json'
import searchByStringResult from '../../test/mocks/searchByString.json'

jest.mock('../repositories/productsRepository')

describe('search Service', () => {
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
  })

  it('should return one element when search by int', async () => {
    const searchText = '123'
    when(findById).calledWith(123).mockReturnValue(searchByIdResult)
    const result = await searchStategy(searchText)

    expect(result).toStrictEqual([searchByIdResult])
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
  })
})
