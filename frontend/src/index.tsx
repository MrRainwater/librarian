import Main from 'components/Global/Main'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BookmarksStoreProvider } from 'stores/BookmarkStore'

ReactDOM.render(
  <BookmarksStoreProvider>
    <Main />
  </BookmarksStoreProvider>,
  document.getElementById('app')
)
