import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { Layout, Panel } from 'react-toolbox/lib/layout'
import Bookmarks from 'components/Bookmarks'
import NewBookmarkButton from 'components/NewBookmarkButton'
import * as classes from './components/styles/panel.scss'

const data = [
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

ReactDOM.render(
  <Provider>
    <Layout>
      <Panel className={classes.panel}>
        <Bookmarks bookmarks={data} />
        <NewBookmarkButton />
      </Panel>
    </Layout>
  </Provider>,
  document.getElementById('app')
)
