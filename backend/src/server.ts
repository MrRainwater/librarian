import * as express from 'express'
import * as graphqlHTTP from 'express-graphql'
import schema from './types'
import BookmarkStore from './bookmarks'
import { getMetadata } from './scraper'
import resolvers from './resolvers'
import * as mongoose from 'mongoose'

const store = new BookmarkStore()
mongoose.connect('mongodb://localhost:27017/librarian', {
  useNewUrlParser: true
})
const root = {
  bookmarks: () => {
    return store.bookmarks
  },
  folders: () => store.folders,
  createBookmark: ({ input }) => {
    store.add(input)
    return input
  },
  createFolder: ({ name }) => store.createFolder(name),
  tagBookmark: ({ id, tag }) => {
    return store.addTag(id, tag)
  },
  folderBookmark: ({ id, folder }) => {
    return store.addFolder(id, folder)
  },
  metadata: ({ url }) => {
    return getMetadata(url)
  },
  ...resolvers
}

const app = express()

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  } else {
    return next()
  }
})

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
)

app.listen(4000)

console.log('Running server at localhost:4000/graphql')
