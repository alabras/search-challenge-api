import { findById, findByBrandDescription } from '../repositories/productsRepository'

const searchStategy = async (searchText) => {
  const resultById = await searchById(searchText)
  const resultByBrandDescription = await searchByBrandAndDescription(searchText)

  return resultById.concat(resultByBrandDescription)
}

const searchById = async (searchText) => {
  const numberRegExp = RegExp(/^\d+$/)
  if (numberRegExp.test(searchText)) {
    const result = await findById(parseInt(searchText))
    return [result]
  }
  return []
}

const searchByBrandAndDescription = async (searchText) => {
  const numberRegExp = RegExp(/^\d+$/)
  if (!numberRegExp.test(searchText)) {
    const result = await findByBrandDescription(searchText)
    return result.toArray()
  }
  return []
}

export default searchStategy
