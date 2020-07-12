import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core'
import FolderList from 'components/Bookmarks/FolderList'
import * as React from 'react'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import { actions, useBookmarksStore } from 'stores/BookmarkStore'

const theme = createMuiTheme()

export const PageAction: React.FC = () => {
  const [{ folders, rootFolderId }, dispatch] = useBookmarksStore()

  React.useEffect(() => {
    dispatch(actions.loadBookmarks())
  }, [])

  return (
    <DndProvider backend={Backend}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <FolderList
          folders={folders}
          rootFolderId={rootFolderId}
          addingBookmark
        />
      </ThemeProvider>
    </DndProvider>
  )
}
