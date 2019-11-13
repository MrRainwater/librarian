import * as faker from 'faker'
import * as mongoose from 'mongoose'
import Bookmark from './models/Bookmark'

mongoose.connect('mongodb://localhost:27017/librarian', {
  useNewUrlParser: true
})

const times = <T>(n: number, cb: (i: number) => T) =>
  [...Array(10).keys()].map(cb)

const bookmarkData = () => ({
  url: faker.internet.url(),
  title: faker.random.word(),
  description: faker.lorem.sentence(),
  img: faker.image.imageUrl()
})

const seed = async () => {
  await Promise.all(times(10, () => Bookmark.create(bookmarkData())))
  console.info('seeded')
  mongoose.disconnect()
}

mongoose.connection.once('open', async () => {
  await mongoose.connection.db.dropDatabase()
  seed()
})
