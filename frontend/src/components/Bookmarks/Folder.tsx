import { openFolder } from 'api'
import LibraryCard from 'components/Util/LibraryCard'
import { IFolderFull } from 'interfaces'
import * as React from 'react'
import { actions, useBookmarksStore } from 'stores/BookmarkStore'

interface IProps {
  folder: IFolderFull
}

const Folder: React.FC<IProps> = ({ folder }) => {
  const [{ folders, currentFolderId }, dispatch] = useBookmarksStore()
  const onClick = async () => {
    console.log({folder})
    if (!folder.bookmarks) {
      const bookmarks = await openFolder(folder.id)
      dispatch(
        actions.setFolder({
          folderId: folder.id,
          bookmarks
        })
      )
    } else {
      dispatch(actions.openFolder({ folderId: folder.id }))
    }
  }
  return (
    <LibraryCard
      title={folder.name}
      img={'/folder.png'}
      actions={null}
      onClick={onClick}
    />
  )
}

export default Folder
