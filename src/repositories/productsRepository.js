import { getDb } from './db'
const COLLECTION = 'products'

const findById = async (id) => {
  const query = { id: { $eq: id } }
  const options = { projection: { _id: 0, id: 1, brand: 1, description: 1, image: 1, price: 1 } }
  return await getDb(COLLECTION).findOne(query, options)
}

const findByBrandDescription = async (search) => {
  const query = {
    $or: [{ brand: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }],
  }
  const options = { projection: { _id: 0, id: 1, brand: 1, description: 1, image: 1, price: 1 } }
  return await getDb(COLLECTION).find(query, options)
}

export { findById, findByBrandDescription }
