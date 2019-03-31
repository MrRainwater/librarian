import * as React from 'react'
import AppBar from 'react-toolbox/lib/app_bar'
import NewBookarkInput from './NewBookmarkInput'
import { IBookmark } from 'interfaces'
import CreateBookmarkDialog from './CreateBookmarkDialog'

const { useState } = React

const LibrarianAppBar: React.FunctionComponent = () => {
  const [bookmark, setBookmark] = useState<IBookmark | undefined>(undefined)

  return (
    <AppBar title="Librarian">
      <NewBookarkInput onNewBookmark={setBookmark} />
      {bookmark && (
        <CreateBookmarkDialog
          metadata={bookmark}
          onCancel={() => setBookmark(undefined)}
          onSave={() => setBookmark(undefined)}
        />
      )}
    </AppBar>
  )
}

export default LibrarianAppBar
