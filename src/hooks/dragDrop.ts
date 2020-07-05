import { useDrop, useDrag } from 'react-dnd'
import { useBookmarksStore, actions } from 'stores/BookmarkStore'
// import { actions, useBookmarksStore } from 'stores/BookmarkStore'

export const bookmarkDragType = 'BOOKMARK'

interface IDragBookmark {
  type: typeof bookmarkDragType
  id: string
  parentId: string
}

interface IDragCollection {
  isOver: boolean
}

export const useDropBookmark = (folderId: string) => {
  const [{ folders }, dispatch] = useBookmarksStore()
  return useDrop<IDragBookmark, unknown, IDragCollection>({
    accept: bookmarkDragType,
    canDrop: (item) => !folders[item.id],
    drop: (item) =>
      dispatch(
        actions.moveBookmark({ bookmarkId: item.id, targetFolderId: folderId })
      ),
    collect: (monitor) => ({ isOver: monitor.isOver() })
  })
}

export const useDragBookmark = (bookmarkId: string, folderId: string) => {
  const [, dragRef] = useDrag({
    item: { type: bookmarkDragType, folderId, id: bookmarkId },
    collect: () => ({})
  })
  return dragRef
}
