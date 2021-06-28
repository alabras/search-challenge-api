import { when } from 'jest-when'
import { MongoClient } from 'mongodb'
import { closeDb, connectDb, getDb } from './db'

jest.mock('mongodb')

describe('test connection with mongodb', () => {
  it('should throw exception when does exists environment MONGO_CONNECTION', async () => {
    await expect(connectDb()).rejects.toThrowError('You must set environment variable of MONGO_CONNECTION.')
  })

  it('should connected to mongodb when exists environment MONGO_CONNECTION', async () => {
    process.env.MONGO_CONNECTION = 'mongodb://localhost:27777'
    const connectSpy = jest.spyOn(MongoClient, 'connect').mockReturnValueOnce({})
    const callback = jest.fn()

    await connectDb(callback)

    expect(connectSpy).toBeCalledTimes(1)
    expect(connectSpy).toBeCalledWith('mongodb://localhost:27777', { useUnifiedTopology: true })
    expect(callback).toBeCalledTimes(1)
  })

  it('should throw exception when does exists environment MONGO_DATABASE.', async () => {
    process.env.MONGO_CONNECTION = 'mongodb://localhost:27777'
    const mongoClient = { db: jest.fn() }
    jest.spyOn(MongoClient, 'connect').mockReturnValueOnce(mongoClient)
    await connectDb()

    expect(getDb).toThrowError('You must set environment variable of MONGO_DATABASE.')
  })

  it('should get mongoClient when getDb', async () => {
    process.env.MONGO_CONNECTION = 'mongodb://localhost:27777'
    process.env.MONGO_DATABASE = 'database'
    const mongoClient = { db: jest.fn() }
    const db = { collection: jest.fn() }
    jest.spyOn(MongoClient, 'connect').mockReturnValueOnce(mongoClient)
    when(mongoClient.db).calledWith('database').mockReturnValue(db)
    when(db.collection).calledWith('test').mockReturnValue({})

    await connectDb()

    const client = getDb('test')

    expect(client).toStrictEqual({})
  })

  it('should call to close when closeDb', async () => {
    process.env.MONGO_CONNECTION = 'mongodb://localhost:27777'
    process.env.MONGO_DATABASE = 'database'
    const mongoClient = { close: jest.fn() }
    jest.spyOn(MongoClient, 'connect').mockReturnValueOnce(mongoClient)
    await connectDb()

    closeDb()

    expect(mongoClient.close).toBeCalledTimes(1)
  })
})
