import express from 'express'
import searchStategy from '../services/searchService'

const routerSearch = express.Router()

routerSearch.get('/search', async function (req, res, next) {
  try {
    const searchText = req.query.q
    _validation(searchText)

    const searchResult = await searchStategy(searchText)
    res.send(searchResult)
  } catch (error) {
    next(error)
  }
})

const _validation = (searchText) => {
  const numberRegExp = RegExp(/^\d+$/)
  if (searchText === undefined) {
    const validationError = new Error()
    validationError.type = 'validation'
    validationError.message = 'Debe ingresar algún texto para la busqueda'
    throw validationError
  }

  if (!numberRegExp.test(searchText) && searchText.length < 3) {
    const validationError = new Error()
    validationError.type = 'validation'
    validationError.message = 'Ingrese un texto de al menos 3 caracteres para realizar la busqueda'
    throw validationError
  }
}

export default routerSearch
