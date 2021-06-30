import { MongoClient } from 'mongodb'
import assert from 'assert'

let mongodbClient
const connectDb = async (callback) => {
  const mongodbUrl = process.env.MONGO_CONNECTION
  assert.notStrictEqual(
    mongodbUrl,
    undefined,
    'You must set environment variable of MONGO_CONNECTION.',
  )
  mongodbClient = await MongoClient.connect(mongodbUrl, { useUnifiedTopology: true })
  if (callback) {
    callback()
  }
}

const getDb = (collectionName) => {
  const mongoDataBase = process.env.MONGO_DATABASE
  assert.notStrictEqual(
    mongoDataBase,
    undefined,
    'You must set environment variable of MONGO_DATABASE.',
  )
  return mongodbClient.db(mongoDataBase).collection(collectionName)
}

const closeDb = async () => {
  await mongodbClient?.close()
}

export { connectDb, getDb, closeDb }
