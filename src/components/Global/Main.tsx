import { Box, createMuiTheme, CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import Bookmarks from 'components/Bookmarks/Bookmarks'
import FolderList from 'components/Bookmarks/FolderList'
import { IBookmark } from 'interfaces'
import * as React from 'react'
import AppBar from './AppBar'
import AddFolderButton from 'components/Bookmarks/AddFolderButton'
import { loadBookmarks } from 'stores/BookmarkStore'
import { useState } from 'react'

const theme = createMuiTheme()

const Main: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<IBookmark[]>([])
  React.useEffect(() => {
    loadBookmarks().then(setBookmarks)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar />
      <Box display="flex">
        <Box>
          <FolderList />
        </Box>
        <Box px={4} flexGrow={1}>
          <Bookmarks bookmarks={bookmarks} />
        </Box>
      </Box>
      <Box position="absolute" bottom={0} right={0} m={2}>
        <AddFolderButton />
      </Box>
    </ThemeProvider>
  )
}

export default Main
