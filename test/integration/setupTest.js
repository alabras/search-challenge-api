import mongoUnit from 'mongo-unit'
import seedDatabase from '../mocks/seedDataBase.json'
import { closeDb, connectDb } from '../../src/repositories/db'

jest.setTimeout(60 * 1000 * 10)

const initializeTest = async () => {
  process.env.LIST_CORS_URL = '/'
  process.env.MONGO_DATABASE = 'promotions'
  const testMongoUrl = await mongoUnit.start({ dbName: 'promotions' })
  process.env.MONGO_CONNECTION = testMongoUrl
  await mongoUnit.initDb(process.env.MONGO_CONNECTION, seedDatabase)
  await connectDb()
  expect(testMongoUrl).toBeDefined()
}

const stopTest = async () => {
  await closeDb()
  await mongoUnit.stop()
}

export { initializeTest, stopTest }
