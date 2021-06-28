import app from './app'
import dotenv from 'dotenv'
import { closeDb, connectDb } from './repositories/db'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

let server
connectDb(() => {
  server = app.listen(5000)
})

const closeGracefully = async () => {
  await server.close()
  closeDb()
  process.exit(0)
}

process.on('SIGINT', closeGracefully)
process.on('SIGTERM', closeGracefully)
