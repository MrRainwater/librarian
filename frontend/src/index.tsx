import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import Main from 'components/Main'
import { WithBookmarksStore } from 'stores/BookmarkStore'

ReactDOM.render(
  <Provider>
    <WithBookmarksStore>
      <Main />
    </WithBookmarksStore>
  </Provider>,
  document.getElementById('app')
)
