import * as express from 'express'
import * as graphqlHTTP from 'express-graphql'
import { buildSchema } from 'graphql'

const bookmarks = [
  {
    url: 'https://www.discordapp.com',
    title: 'Discord - Free Voice and Text Chat',
    description:
      'Step up your game with a modern voice & text chat app. Crystal clear voice, multiple server and channel support, mobile apps, and more.',
    img:
      'https://www.discordapp.com/assets/ba74954dde74ff40a32ff58069e78c36.png'
  },
  {
    url: 'https://www.discordapp.com',
    title: 'Discord - Free Voice and Text Chat (1)',
    description:
      'Step up your game with a modern voice & text chat app. Crystal clear voice, multiple server and channel support, mobile apps, and more.',
    img:
      'https://www.discordapp.com/assets/ba74954dde74ff40a32ff58069e78c36.png'
  },
  {
    url: 'https://www.discordapp.com',
    title: 'Discord - Free Voice and Text Chat (2)',
    description:
      'Step up your game with a modern voice & text chat app. Crystal clear voice, multiple server and channel support, mobile apps, and more.',
    img:
      'https://www.discordapp.com/assets/ba74954dde74ff40a32ff58069e78c36.png'
  },
  {
    url: 'https://www.discordapp.com',
    title: 'Discord - Free Voice and Text Chat (3)',
    description:
      'Step up your game with a modern voice & text chat app. Crystal clear voice, multiple server and channel support, mobile apps, and more.',
    img:
      'https://www.discordapp.com/assets/ba74954dde74ff40a32ff58069e78c36.png'
  },
  {
    url: 'https://www.discordapp.com',
    title: 'Discord - Free Voice and Text Chat (4)',
    description:
      'Step up your game with a modern voice & text chat app. Crystal clear voice, multiple server and channel support, mobile apps, and more.',
    img:
      'https://www.discordapp.com/assets/ba74954dde74ff40a32ff58069e78c36.png'
  }
]

const schema = buildSchema(`
  type Bookmark {
    url: String
    title: String
    description: String
    img: String
  }

  type Query {
    bookmarks: [Bookmark]
  }
`)

const root = {
  bookmarks: () => {
    return bookmarks
  }
}

const app = express()
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
)
app.listen(4000)
console.log('Running a GraphQL API server at localhost:4000/graphql')
