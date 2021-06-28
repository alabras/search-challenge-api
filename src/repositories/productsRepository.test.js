import { when } from 'jest-when'
import { getDb } from './db'
import { findByBrandDescription, findById } from './productsRepository'

jest.mock('./db')

const mockDb = {
  find: jest.fn(),
  findOne: jest.fn(),
}

describe('product repository', () => {
  it('query equals for findById', async () => {
    when(getDb).calledWith('products').mockReturnValue(mockDb)
    const query = { id: { $eq: 12 } }

    await findById(12)

    expect(mockDb.findOne).toBeCalledWith(query)
  })

  it('query search by brand or description', async () => {
    when(getDb).calledWith('products').mockReturnValue(mockDb)
    const searchText = 'searchText'
    const query = {
      $or: [{ brand: { $regex: searchText, $options: 'i' } }, { description: { $regex: searchText, $options: 'i' } }],
    }

    await findByBrandDescription(searchText)

    expect(mockDb.find).toBeCalledWith(query)
  })
})
