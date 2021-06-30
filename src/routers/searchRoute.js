import express from 'express'
import discountService from '../services/discountService'
import paginateService from '../services/paginateService'
import searchStategy from '../services/searchService'

const routerSearch = express.Router()

routerSearch.get('/search', async function (req, res, next) {
  try {
    const searchText = req.query.q
    const page = parsePage(req.query.page)
    _validation(searchText)

    const searchCursorResult = await searchStategy(searchText)
    const paginate = await paginateService(searchCursorResult, page)
    paginate.products = await discountService(searchText, paginate.products)
    if (paginate.products.length === 0)
      res
        .status(404)
        .send({ message: 'No existen resultados para la busqueda ' + searchText })
    else res.send(paginate)
  } catch (error) {
    next(error)
  }
})

const parsePage = (page) => {
  const numberRegExp = RegExp(/^\d+$/)
  if (!numberRegExp.test(page)) return 1
  return parseInt(page)
}

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
    validationError.message =
      'Ingrese un texto de al menos 3 caracteres para realizar la busqueda'
    throw validationError
  }
}

export default routerSearch
