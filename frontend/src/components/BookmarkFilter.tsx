import * as React from 'react'
import Input from 'react-toolbox/lib/input'
import BookmarkCollection from 'models/BookmarkCollection'
import { IBookmark } from 'interfaces'

interface Props {
  bookmarks: IBookmark[]
  onResults: (bookmarks: IBookmark[]) => void
}

const BookmarkFilter: React.FC<Props> = ({ bookmarks, onResults }) => {
  const [searchText, setSearchText] = React.useState('')
  const bookmarkCollection = new BookmarkCollection(bookmarks)

  React.useEffect(
    () => onResults([...bookmarkCollection.titleContains(searchText)]),
    [searchText]
  )

  return (
    <Input
      type="text"
      label="Filter"
      value={searchText}
      onChange={setSearchText}
    />
  )
}

export default BookmarkFilter
