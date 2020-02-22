import { IBookmark, IFolderNode } from 'interfaces'
import * as React from 'react'
import Bookmark from './Bookmark'
import Folder from './Folder'
import * as classes from './styles/Bookmarks.scss'

interface IProps {
  bookmarks: IBookmark[]
  folders: IFolderNode[]
  currentFolderId: string
}

const Bookmarks: React.FunctionComponent<IProps> = ({
  bookmarks,
  folders,
  currentFolderId
}) => {
  return (
    <div className={classes.bookmarks}>
      {folders.map((folder) => (
        <Folder key={folder.id} folder={folder} />
      ))}
      {bookmarks.map((bookmark) => (
        <Bookmark
          key={bookmark.id}
          bookmark={bookmark}
          folderId={currentFolderId}
        />
      ))}
    </div>
  )
}

export default Bookmarks
