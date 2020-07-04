import { IBookmark, IFolderNode } from 'interfaces'
import * as React from 'react'
import { List, makeStyles, Divider } from '@material-ui/core'
import BookmarkListItem from './BookmarkListItem'
import { useBookmarksStore, actions } from 'stores/BookmarkStore'

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

const Bookmarks: React.FunctionComponent<IProps> = ({
  bookmarks,
  folders,
  currentFolderId
}) => {
  const classes = useStyles()
  const [, dispatch] = useBookmarksStore()
  const openBookmark = (folderId: string) =>
    dispatch(actions.setOpenFolder({ folderId }))

  return (
    <List className={classes.list}>
      {folders.map((folder, i) => (
        <React.Fragment key={folder.id}>
          {i !== 0 && <Divider />}
          <BookmarkListItem
            key={folder.id}
            id={folder.id}
            parentId={currentFolderId}
            type="folder"
            title={folder.title}
            onClick={() => openBookmark(folder.id)}
          />
        </React.Fragment>
      ))}
      {bookmarks.map((bookmark) => (
        <React.Fragment key={bookmark.id}>
          <Divider />
          <BookmarkListItem
            key={bookmark.id}
            id={bookmark.id}
            parentId={currentFolderId}
            type="bookmark"
            title={bookmark.title}
            url={bookmark.url}
          />
        </React.Fragment>
      ))}
    </List>
  )
}

export default Bookmarks
