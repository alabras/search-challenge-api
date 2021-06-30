const PAGE_SIZE = 10

const paginateService = async (searchCursorResult, page) => {
  if (searchCursorResult && _isCursor(searchCursorResult)) {
    const totalPages = await _getTotalPages(searchCursorResult)
    if (totalPages === 0) return { products: [], totalPages, page: 0 }

    const correctPage = _checkCurrentPage(page, totalPages)
    const skip = (correctPage - 1) * PAGE_SIZE
    const products = await searchCursorResult.skip(skip).limit(PAGE_SIZE).toArray()
    return { products, totalPages, page: correctPage }
  }
  return { products: searchCursorResult, page: 1, totalPages: 1 }
}

const _checkCurrentPage = (page, totalPages) => {
  return page > totalPages ? totalPages : page
}

const _getTotalPages = async (searchCursorResult) => {
  const total = await searchCursorResult.count()
  return total % PAGE_SIZE !== 0
    ? Math.trunc(total / PAGE_SIZE) + 1
    : Math.trunc(total / PAGE_SIZE)
}

const _isCursor = (searchCursorResult) => {
  return searchCursorResult && searchCursorResult.cursorState !== undefined
}

export default paginateService
