import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import errorResponse from './middlewares/error'
import routerHealtCheck from './routers/healthCheck'
import routerSearch from './routers/searchRoute'

const app = express()

const corsOptionsDelegate = function (req, callback) {
  var corsOptions
  if (process.env.LIST_CORS_URL.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }
  } else {
    corsOptions = { origin: false }
  }
  callback(null, corsOptions)
}

app.use(helmet())
app.use(express.json())
app.use(cors(corsOptionsDelegate))

app.use('/api', routerHealtCheck)
app.use('/api', routerSearch)

app.use(errorResponse)

export default app
