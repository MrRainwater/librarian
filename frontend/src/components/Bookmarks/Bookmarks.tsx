import { IBookmark } from 'interfaces'
import * as React from 'react'
import Bookmark from './Bookmark'
import * as classes from './styles/Bookmarks.scss'

interface IProps {
  bookmarks: IBookmark[]
}

const Bookmarks: React.FunctionComponent<IProps> = ({ bookmarks }) => {
  return (
    <div className={classes.bookmarks}>
      {bookmarks.map((bookmark) => (
        <Bookmark key={bookmark.title} bookmark={bookmark} />
      ))}
    </div>
  )
}

export default Bookmarks
