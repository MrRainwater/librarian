import { List, ListItem, ListItemIcon, makeStyles } from '@material-ui/core'
import { Folder as FolderIcon } from '@material-ui/icons'
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
  onFolderClick: (id: string) => void
}

const CurrentFolder: React.FC<IProps> = ({
  folders,
  rootFolderId,
  onFolderClick
}) => {
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
      <FolderListItem folder={hierarchy} onClick={onFolderClick} />
    </List>
  )
}

export default CurrentFolder
