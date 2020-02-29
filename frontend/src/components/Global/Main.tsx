import { Box, createMuiTheme, CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import Bookmarks from 'components/Bookmarks/Bookmarks'
import FolderList from 'components/Bookmarks/FolderList'
import { IBookmarkNode, IFolder } from 'interfaces'
import * as React from 'react'
import { actions, useBookmarksStore } from 'stores/BookmarkStore'
import AppBar from './AppBar'

const theme = createMuiTheme()

const Main: React.FC = () => {
  const [
    { folders, currentFolderId, rootFolderId },
    dispatch
  ] = useBookmarksStore()
  const children = folders[currentFolderId]?.children ?? []
  const bookmarks = children.filter(
    (node): node is IBookmarkNode => node.type === 'bookmark'
  )
  const currentFolders = children.filter(
    (node): node is IFolder => node.type === 'folder'
  )

  React.useEffect(() => {
    console.log('loading bookmarks')
    dispatch(actions.loadBookmarks())
  }, [])

  console.log({ currentFolders })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar />
      <Box display="flex">
        <Box>
          <FolderList
            folders={folders}
            rootFolderId={rootFolderId}
            onFolderClick={(folderId) => {
              console.log('opening', { folderId })
              dispatch(actions.setOpenFolder({ folderId }))
            }}
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
