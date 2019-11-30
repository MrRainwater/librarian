import { IBookmark, IFolder } from 'interfaces'
import * as React from 'react'
import Bookmark from './Bookmark'
import * as classes from './styles/Bookmarks.scss'
import Folder from './Folder'

interface IProps {
  bookmarks: IBookmark[]
  folders: IFolder[]
}

const Bookmarks: React.FunctionComponent<IProps> = ({ bookmarks, folders }) => {
  return (
    <div className={classes.bookmarks}>
      {folders.map((folder) => (
        <Folder folder={folder} />
      ))}
      {bookmarks.map((bookmark) => (
        <Bookmark key={bookmark.title} bookmark={bookmark} />
      ))}
    </div>
  )
}

export default Bookmarks
