import * as React from 'react'
import * as classes from './styles/Bookmarks.scss'
import { IBookmark } from 'interfaces'
import Bookmark from './Bookmark'

interface Props {
  bookmarks: IBookmark[]
}

const Bookmarks: React.FunctionComponent<Props> = ({ bookmarks }) => {
  return (
    <div className={classes.bookmarks}>
      {bookmarks.map(bookmark => (
        <Bookmark
          key={bookmark.title}
          bookmark={bookmark}
          className={classes.bookmark}
        />
      ))}
    </div>
  )
}

export default Bookmarks
