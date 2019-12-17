import { openFolder } from 'api'
import LibraryCard from 'components/Util/LibraryCard'
import { IFolderFull } from 'interfaces'
import * as React from 'react'
import { actions, useBookmarksStore } from 'stores/BookmarkStore'

interface IProps {
  folder: IFolderFull
}

const Folder: React.FC<IProps> = ({ folder }) => {
  const [, dispatch] = useBookmarksStore()
  const onClick = () => dispatch(actions.openBookmark({ folderId: folder.id }))
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
