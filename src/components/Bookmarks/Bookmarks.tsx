import { IBookmark } from 'interfaces'
import * as React from 'react'
import { List, makeStyles, Divider } from '@material-ui/core'
import BookmarkListItem from './BookmarkListItem'

interface IProps {
  bookmarks: IBookmark[]
}

const useStyles = makeStyles((theme) => ({
  list: {
    backgroundColor: theme.palette.background.paper
  }
}))

const Bookmarks: React.FunctionComponent<IProps> = ({ bookmarks }) => {
  const classes = useStyles()

  return (
    <List className={classes.list}>
      {bookmarks.map((bookmark) => (
        <React.Fragment key={bookmark.id}>
          <BookmarkListItem
            key={bookmark.id}
            title={bookmark.title}
            url={bookmark.url}
          />
          <Divider />
        </React.Fragment>
      ))}
    </List>
  )
}

export default Bookmarks
