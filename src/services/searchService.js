import { findById, findByBrandDescription } from '../repositories/productsRepository'

const searchStategy = async (searchText) => {
  const resultById = await searchById(searchText)
  const resultByBrandDescription = await searchByBrandAndDescription(searchText)

  return resultById ?? resultByBrandDescription
}

const searchById = async (searchText) => {
  const numberRegExp = RegExp(/^\d+$/)
  if (numberRegExp.test(searchText)) {
    const result = await findById(parseInt(searchText))
    if (result) return [result]
    return []
  }
  return undefined
}

const searchByBrandAndDescription = async (searchText) => {
  const numberRegExp = RegExp(/^\d+$/)
  if (!numberRegExp.test(searchText)) {
    return await findByBrandDescription(searchText)
  }
  return undefined
}

export default searchStategy
