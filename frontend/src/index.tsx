import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import Main from 'components/Main'

ReactDOM.render(
  <Provider>
    <Main />
  </Provider>,
  document.getElementById('app')
)
