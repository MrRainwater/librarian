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

interface Bookmark {
  url: string
  title: string
  description: string
  img: string
}

export default class BookmarkStore {
  data: Bookmark[] = bookmarks

  add(bookmark: Bookmark) {
    this.data.push(bookmark)
  }
}
