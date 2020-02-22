import Main from 'components/Global/Main'
import * as React from 'react'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from 'stores/BookmarkStore'

// tslint:disable-next-line: no-namespace
declare namespace browser {
  const bookmarks: string[]
}

console.log(browser)

ReactDOM.render(
  <DndProvider backend={Backend}>
    <Provider store={store}>
      <Main />
    </Provider>
  </DndProvider>,
  document.getElementById('app')
)
