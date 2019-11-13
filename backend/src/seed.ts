import * as faker from 'faker'
import * as mongoose from 'mongoose'
import Bookmark from './models/Bookmark'

mongoose.connect('mongodb://localhost:27017/librarian', {
  useNewUrlParser: true
})

const seed = async () => {
  await Promise.all(
    [...Array(10).keys()].map(() =>
      Bookmark.create({
        url: faker.internet.url(),
        title: faker.random.word(),
        description: faker.lorem.sentence(),
        img: faker.image.imageUrl()
      })
    )
  )
  console.info('seeded')
  mongoose.disconnect()
}

mongoose.connection.once('open', () => {
  mongoose.connection.db.dropDatabase()
  seed()
})
