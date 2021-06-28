const errorResponse = (err, req, res, next) => {
  if (err.type && err.type === 'validation') {
    res.header('Content-Type', 'application/json')
    res.status(400).send(err)
  } else {
    next(err)
  }
}

export default errorResponse
