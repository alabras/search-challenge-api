import app from './app'
import dotenv from 'dotenv'
import { closeDb, connectDb } from './repositories/db'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

let server

const startServer = async () => {
  try {
    await connectDb()
    server = app.listen(5000)
  } catch (error) {
    console.error('Ups, cant start server: ', error)
  }
}

const closeGracefully = async () => {
  try {
    await server?.close()
    await closeDb()
  } catch (error) {
    console.error('Ups, cant stop server: ', error)
  } finally {
    process.exit(0)
  }
}

process.on('SIGINT', closeGracefully)
process.on('SIGTERM', closeGracefully)

startServer()
