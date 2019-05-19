import * as React from 'react'
import { Layout, Panel } from 'react-toolbox/lib/layout'
import Bookmarks from 'components/Bookmarks'
import * as classes from './styles/panel.scss'
import { getBookmarks } from 'api'
import AppBar from './AppBar'
import { useBookmarks } from 'hooks'
import BookmarkCollection from 'models/BookmarkCollection'
import BookmarkFilter from './BookmarkFilter'
import { IBookmark } from 'interfaces'

const Main: React.FunctionComponent = () => {
  const [bookmarks, setBookmarks] = React.useState<IBookmark[]>([])
  const [filteredBookmarks, setFiltered] = React.useState(bookmarks)

  React.useEffect(() => {
    getBookmarks().then(bookmarks => {
      setBookmarks(bookmarks)
      setFiltered(bookmarks)
    })
  }, [])

  return (
    <Layout>
      <Panel className={classes.panel}>
        <AppBar />
        <BookmarkFilter initialBookmarks={bookmarks} onResults={setFiltered} />
        <Bookmarks bookmarks={filteredBookmarks} />
      </Panel>
    </Layout>
  )
}

export default Main
