import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Main from 'components/Main'
import { BookmarksStoreProvider } from 'stores/BookmarkStore'

ReactDOM.render(
  <BookmarksStoreProvider>
    <Main />
  </BookmarksStoreProvider>,
  document.getElementById('app')
)
