import app from './app'

const server = app.listen(5000)

const closeGracefully = async () => {
  await server.close()
  process.exit(0)
}

process.on('SIGINT', closeGracefully)
process.on('SIGTERM', closeGracefully)
