import express from 'express'

const routerHealtCheck = express.Router()

routerHealtCheck.get('/health', async function (req, res) {
  res.send('OK')
})

export default routerHealtCheck
