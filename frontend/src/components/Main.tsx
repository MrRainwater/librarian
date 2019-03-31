import * as React from 'react'
import { Layout, Panel } from 'react-toolbox/lib/layout'
import Bookmarks from 'components/Bookmarks'
import NewBookmarkButton from 'components/NewBookmarkButton'
import * as classes from './styles/panel.scss'
import { IBookmarkCreate, IBookmark } from 'interfaces'
import { getBookmarks } from 'api'
import AppBar from './AppBar'

const Main: React.FunctionComponent = () => {
  const [isCreateActive, setIsCreateActive] = React.useState(false)
  const [bookmarks, setBookmarks] = React.useState<IBookmark[]>([])

  React.useEffect(() => {
    getBookmarks().then(setBookmarks)
  }, [])

  function saveBookmark(bookmark: IBookmarkCreate) {
    console.log(bookmark)
    setIsCreateActive(false)
  }

  return (
    <Layout>
      <Panel className={classes.panel}>
        <AppBar />
        <Bookmarks bookmarks={bookmarks} />
      </Panel>
    </Layout>
  )
}

export default Main
