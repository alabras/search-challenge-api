import { getDb } from './db'
const COLLECTION = 'products'

const findById = async (id) => {
  const query = { id: { $eq: id } }
  return await getDb(COLLECTION).findOne(query)
}

const findByBrandDescription = async (search) => {
  const query = {
    $or: [{ brand: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }],
  }
  return await getDb(COLLECTION).find(query)
}

export { findById, findByBrandDescription }
