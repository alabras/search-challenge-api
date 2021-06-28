import express from 'express'
import helmet from 'helmet'
import errorResponse from './middlewares/error'
import routerHealtCheck from './routers/healthCheck'
import routerSearch from './routers/searchRoute'

const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(helmet())

app.use('/api', routerHealtCheck)
app.use('/api', routerSearch)

app.use(errorResponse)

export default app
