import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import Main from 'components/Main'
import { BookmarksStoreProvider } from 'stores/BookmarkStore'

ReactDOM.render(
  <Provider>
    <BookmarksStoreProvider>
      <Main />
    </BookmarksStoreProvider>
  </Provider>,
  document.getElementById('app')
)
