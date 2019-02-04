import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'

ReactDOM.render(
  <Provider>
    <h1>Hi</h1>
  </Provider>,
  document.getElementById('app')
)
