import { Container } from '@material-ui/core'
import { getBookmarks } from 'api'
import Bookmarks from 'components/Bookmarks/Bookmarks'
import * as React from 'react'
import { useBookmarksStore } from 'stores/BookmarkStore'
import AppBar from './AppBar'
import BookmarkFilter from './BookmarkFilter'

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
    <>
      <AppBar />
      <Container maxWidth="xl">
        <BookmarkFilter bookmarks={bookmarks} onResults={setFiltered} />
        <Bookmarks bookmarks={filteredBookmarks} />
      </Container>
    </>
  )
}

export default Main
