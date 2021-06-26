import express from 'express'
import helmet from 'helmet'
import routerHealtCheck from './routers/healthCheck'

const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(helmet())

app.use('/api', routerHealtCheck)

export default app
