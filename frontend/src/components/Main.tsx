import { getBookmarks } from 'api'
import Bookmarks from 'components/Bookmarks/Bookmarks'
import { useBookmarks } from 'hooks'
import { IBookmark } from 'interfaces'
import BookmarkCollection from 'models/BookmarkCollection'
import * as React from 'react'
import { Layout, Panel } from 'react-toolbox/lib/layout'
import { useBookmarksStore } from 'stores/BookmarkStore'
import AppBar from './AppBar'
import BookmarkFilter from './BookmarkFilter'
import * as classes from './styles/panel.scss'

const Main: React.FunctionComponent = () => {
  const [{ bookmarks }, dispatch] = useBookmarksStore()
  const [filteredBookmarks, setFiltered] = React.useState(bookmarks)

  React.useEffect(() => {
    getBookmarks().then((data) => {
      dispatch({ type: 'SET_BOOKMARKS', bookmarks: data })
      setFiltered(data)
    })
  }, [])

  return (
    <Layout>
      <Panel className={classes.panel}>
        <AppBar />
        <BookmarkFilter bookmarks={bookmarks} onResults={setFiltered} />
        <Bookmarks bookmarks={filteredBookmarks} />
      </Panel>
    </Layout>
  )
}

export default Main
