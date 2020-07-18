import Main from 'components/Global/Main'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace browser {
  const bookmarks: string[]
}

ReactDOM.render(<Main />, document.getElementById('app'))
