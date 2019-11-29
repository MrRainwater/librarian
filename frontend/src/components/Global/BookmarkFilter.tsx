import { TextField } from '@material-ui/core'
import { IBookmark } from 'interfaces'
import BookmarkCollection from 'models/BookmarkCollection'
import * as React from 'react'

interface IProps {
  bookmarks: IBookmark[]
  onResults: (bookmarks: IBookmark[]) => void
}

const BookmarkFilter: React.FC<IProps> = ({ bookmarks, onResults }) => {
  const [searchText, setSearchText] = React.useState('')
  const bookmarkCollection = new BookmarkCollection(bookmarks)

  React.useEffect(
    () => onResults([...bookmarkCollection.titleContains(searchText)]),
    [searchText]
  )

  return (
    <TextField
      type="text"
      label="Filter"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
    />
  )
}

export default BookmarkFilter
