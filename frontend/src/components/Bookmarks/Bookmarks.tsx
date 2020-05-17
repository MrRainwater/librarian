import { IBookmark, IFolderNode } from 'interfaces'
import * as React from 'react'
import { List, makeStyles, Divider } from '@material-ui/core'
import BookmarkListItem from './BookmarkListItem'

interface IProps {
  bookmarks: IBookmark[]
  folders: IFolderNode[]
  currentFolderId: string
}

const useStyles = makeStyles((theme) => ({
  list: {
    backgroundColor: theme.palette.background.paper
  }
}))

const Bookmarks: React.FunctionComponent<IProps> = ({ bookmarks, folders }) => {
  const classes = useStyles()
  return (
    <List className={classes.list}>
      {folders.map((folder, i) => (
        <>
          {i !== 0 && <Divider />}
          <BookmarkListItem
            key={folder.id}
            icon="folder"
            title={folder.title}
          />
        </>
      ))}
      {bookmarks.map((bookmark) => (
        <>
          <Divider />
          <BookmarkListItem
            key={bookmark.id}
            icon="bookmark"
            title={bookmark.title}
            url={bookmark.url}
          />
        </>
      ))}
    </List>
  )
}

export default Bookmarks
