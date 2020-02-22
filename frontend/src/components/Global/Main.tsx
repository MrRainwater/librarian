import { Box, createMuiTheme, CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import Bookmarks from 'components/Bookmarks/Bookmarks'
import FolderList from 'components/Bookmarks/FolderList'
import { IBookmarkNode } from 'interfaces'
import * as React from 'react'
import { actions, useBookmarksStore } from 'stores/BookmarkStore'
import AppBar from './AppBar'

const theme = createMuiTheme()

const Main: React.FC = () => {
  const [{ folders, currentFolderId }, dispatch] = useBookmarksStore()
  const folder = folders[currentFolderId]!
  const bookmarks = folder.children.filter(
    (node): node is IBookmarkNode => node.type === 'bookmark'
  )
  const currentFolders = Object.values(folders).filter(
    ({ id }) => id !== currentFolderId
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar />
      <Box display="flex">
        <Box>
          <FolderList
            folders={folders}
            currentFolderId={currentFolderId}
            onFolderClick={(folderId) =>
              dispatch(actions.openBookmark({ folderId }))
            }
          />
        </Box>
        <Box px={4} flexGrow={1}>
          <Bookmarks
            currentFolderId={currentFolderId}
            bookmarks={bookmarks}
            folders={currentFolders}
          />
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default Main
