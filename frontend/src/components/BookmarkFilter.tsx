import { IBookmark } from 'interfaces'
import BookmarkCollection from 'models/BookmarkCollection'
import * as React from 'react'
import Input from 'react-toolbox/lib/input'

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
    <Input
      type="text"
      label="Filter"
      value={searchText}
      onChange={setSearchText}
    />
  )
}

export default BookmarkFilter
