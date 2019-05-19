import * as React from 'react'
import Input from 'react-toolbox/lib/input'
import BookmarkCollection from 'models/BookmarkCollection'
import { IBookmark } from 'interfaces'

interface Props {
  initialBookmarks: IBookmark[]
  onResults: (bookmarks: IBookmark[]) => void
}

const BookmarkFilter: React.FC<Props> = ({ initialBookmarks, onResults }) => {
  const [searchText, setSearchText] = React.useState('')
  const bookmarks = new BookmarkCollection(initialBookmarks)

  React.useEffect(() => onResults([...bookmarks.titleContains(searchText)]), [
    searchText
  ])

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
