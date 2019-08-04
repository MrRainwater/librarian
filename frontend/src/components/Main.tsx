import * as React from 'react'
import { Layout, Panel } from 'react-toolbox/lib/layout'
import Bookmarks from 'components/Bookmarks/Bookmarks'
import * as classes from './styles/panel.scss'
import { getBookmarks } from 'api'
import AppBar from './AppBar'
import { useBookmarks } from 'hooks'
import BookmarkCollection from 'models/BookmarkCollection'
import BookmarkFilter from './BookmarkFilter'
import { IBookmark } from 'interfaces'
import { useBookmarksStore } from 'stores/BookmarkStore'

const Main: React.FunctionComponent = () => {
  const [{ bookmarks }, dispatch] = useBookmarksStore()
  const [filteredBookmarks, setFiltered] = React.useState(bookmarks)

  React.useEffect(() => {
    getBookmarks().then(bookmarks => {
      dispatch({ type: 'SET_BOOKMARKS', bookmarks })
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
