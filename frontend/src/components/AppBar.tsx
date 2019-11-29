import { AppBar, Box, Toolbar, Typography } from '@material-ui/core'
import { IBookmark } from 'interfaces'
import * as React from 'react'
import CreateBookmarkDialog from './CreateBookmarkDialog'
import NewBookarkInput from './NewBookmarkInput'

const { useState } = React

const LibrarianAppBar: React.FunctionComponent = () => {
  const [bookmark, setBookmark] = useState<IBookmark | undefined>(undefined)

  return (
    <AppBar title="Librarian">
      <Toolbar>
        <Typography variant="h4">Librarian</Typography>
        <Box flexGrow={1} />
        <NewBookarkInput onNewBookmark={setBookmark} />
        {bookmark && (
          <CreateBookmarkDialog
            metadata={bookmark}
            onCancel={() => setBookmark(undefined)}
            onSave={() => setBookmark(undefined)}
          />
        )}
      </Toolbar>
    </AppBar>
  )
}

export default LibrarianAppBar
