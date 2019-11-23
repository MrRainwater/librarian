import { IBookmark } from 'interfaces'
import * as React from 'react'
import AppBar from 'react-toolbox/lib/app_bar'
import CreateBookmarkDialog from './CreateBookmarkDialog'
import NewBookarkInput from './NewBookmarkInput'

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
