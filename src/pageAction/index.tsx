import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from 'stores/BookmarkStore'
import { PageAction } from './PageAction'

ReactDOM.render(
  <Provider store={store}>
    <PageAction />
  </Provider>,
  document.getElementById('app')
)
