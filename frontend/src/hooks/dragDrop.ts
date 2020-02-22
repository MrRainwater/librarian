import { bookmarkDragType } from 'components/Bookmarks/Bookmark'
import { useDrop } from 'react-dnd'
import { actions, useBookmarksStore } from 'stores/BookmarkStore'

interface IDragAction {
  id: string
  type: string
}

interface IDragCollection {
  isOver: boolean
}

export const useDropBookmark = (folderId: string, hover: () => void) => {
  const [, dispatch] = useBookmarksStore()
  return useDrop<IDragAction, unknown, IDragCollection>({
    accept: bookmarkDragType,
    drop: (item) => console.log('dropped bookmark'),
    hover,
    collect: (monitor) => ({ isOver: monitor.isOver() })
  })
}
