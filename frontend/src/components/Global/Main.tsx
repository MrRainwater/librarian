import { Box, Container, createMuiTheme, CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { getInitial } from 'api'
import Bookmarks from 'components/Bookmarks/Bookmarks'
import CurrentFolder from 'components/Bookmarks/CurrentFolder'
import { IFolderFull } from 'interfaces'
import * as React from 'react'
import { actions, useBookmarksStore } from 'stores/BookmarkStore'
import AppBar from './AppBar'
import BookmarkFilter from './BookmarkFilter'
import SpeedDialButton from './SpeedDialButton'

const theme = createMuiTheme()

const Main: React.FC = () => {
  const [{ folders, currentFolderId }, dispatch] = useBookmarksStore()
  const folder = folders[currentFolderId]!
  const bookmarks = 'bookmarks' in folder ? folder.bookmarks : []
  const [filteredBookmarks, setFiltered] = React.useState(bookmarks)
  const currentFolders = Object.values(folders).filter(
    ({ parentFolderId, id }) =>
      id !== currentFolderId && parentFolderId === currentFolderId
  ) as IFolderFull[]

  React.useEffect(() => {
    getInitial().then((data) => {
      dispatch(actions.initialize(data))
    })
  }, [])

  React.useEffect(() => {
    setFiltered(bookmarks)
  }, [bookmarks])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl">
        <AppBar />
        <BookmarkFilter bookmarks={bookmarks} onResults={setFiltered} />
        <CurrentFolder />
        <Bookmarks bookmarks={filteredBookmarks} folders={currentFolders} />
        <Box position="fixed" bottom={0} right={0} m={3}>
          <SpeedDialButton />
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Main
