import * as React from 'react'
import { Layout, Panel } from 'react-toolbox/lib/layout'
import Bookmarks from 'components/Bookmarks'
import * as classes from './styles/panel.scss'
import { getBookmarks } from 'api'
import AppBar from './AppBar'
import { useBookmarks } from 'hooks'

const Main: React.FunctionComponent = () => {
  const [bookmarks, setBookmarks] = useBookmarks()

  React.useEffect(() => {
    getBookmarks().then(setBookmarks)
  }, [])

  return (
    <Layout>
      <Panel className={classes.panel}>
        <AppBar />
        <Bookmarks bookmarks={bookmarks} />
      </Panel>
    </Layout>
  )
}

export default Main
