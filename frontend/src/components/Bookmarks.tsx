import * as React from 'react'
import * as classes from './styles/Bookmarks.scss'
import { IBookmark } from 'interfaces'
import Bookmark from './Bookmark'
import { useBookmarksStore } from 'stores/BookmarkStore'

interface Props {
  bookmarks: IBookmark[]
}

const Bookmarks: React.FunctionComponent<Props> = ({ bookmarks }) => {
  const [state, dispatch] = useBookmarksStore()
  return (
    <div className={classes.bookmarks}>
      {bookmarks.map(bookmark => (
        <Bookmark key={bookmark.title} bookmark={bookmark} />
      ))}
    </div>
  )
}

export default Bookmarks
