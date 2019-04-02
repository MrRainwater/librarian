import * as express from 'express'
import * as graphqlHTTP from 'express-graphql'
import schema from './types'
import BookmarkStore from './bookmarks'
import { getMetadata } from './scraper'

const store = new BookmarkStore()

const root = {
  bookmarks: () => {
    return store.data
  },
  createBookmark: ({ input }) => {
    store.add(input)
    return input
  },
  metadata: ({ url }) => {
    return getMetadata(url)
  }
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
