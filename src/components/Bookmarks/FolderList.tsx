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
}

const FolderList: React.FC<IProps> = ({ folders, rootFolderId }) => {
  const styles = useStyles()
  const foldersList = Object.values(folders).filter(({ id }) => id !== '')
  const rootFolder = folders[rootFolderId]

  const nestFolder = (folder: IFolder): INestedFolder => ({
    ...folder,
    subFolders: foldersList
      .filter(({ parentId }) => parentId === folder.id)
      .map(nestFolder)
  })

  const hierarchy = nestFolder(rootFolder)

  return (
    <List className={styles.folderList}>
      <FolderListItem folder={hierarchy} />
    </List>
  )
}

export default FolderList
