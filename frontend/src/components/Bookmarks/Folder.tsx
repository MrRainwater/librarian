import LibraryCard from 'components/Util/LibraryCard'
import { IFolderNode } from 'interfaces'
import * as React from 'react'
import { actions, useBookmarksStore } from 'stores/BookmarkStore'

interface IProps {
  folder: IFolderNode
}

const Folder: React.FC<IProps> = ({ folder }) => {
  const [, dispatch] = useBookmarksStore()
  const onClick = () => dispatch(actions.setOpenFolder({ folderId: folder.id }))
  return (
    <LibraryCard
      title={folder.title}
      img={'/folder.png'}
      actions={null}
      onClick={onClick}
    />
  )
}

export default Folder
