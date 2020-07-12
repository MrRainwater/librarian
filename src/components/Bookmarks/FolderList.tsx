import { List, makeStyles } from '@material-ui/core'
import { IFolder, INestedFolder } from 'interfaces'
import * as React from 'react'
import { IFolderMap } from 'stores/BookmarkStore'
import FolderListItem from './FolderListItem'

const useStyles = makeStyles({
  folderList: {
    width: 350,
    height: '100%'
  }
})

interface IProps {
  folders: IFolderMap
  rootFolderId: string
  addingBookmark?: boolean
}

const FolderList: React.FC<IProps> = ({
  folders,
  rootFolderId,
  addingBookmark = false
}) => {
  const styles = useStyles()
  const foldersList = Object.values(folders).filter(
    (folder): folder is IFolder => folder?.id !== ''
  )
  const rootFolder = folders[rootFolderId]

  const nestFolder = (folder: IFolder): INestedFolder => ({
    ...folder,
    subFolders: foldersList
      .filter(({ parentId }) => parentId === folder.id)
      .map(nestFolder)
  })

  return (
    <List className={styles.folderList}>
      {rootFolder && (
        <FolderListItem
          folder={nestFolder(rootFolder)}
          addingBookmark={addingBookmark}
        />
      )}
    </List>
  )
}

export default FolderList
