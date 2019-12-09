import { List, ListItem, ListItemIcon, makeStyles } from '@material-ui/core'
import { Folder as FolderIcon } from '@material-ui/icons'
import { IFolder, INestedFolder } from 'interfaces'
import * as React from 'react'
import { IFolderMap } from 'stores/BookmarkStore'
import FolderListItem from './FolderListItem'

const useStyles = makeStyles({
  root: {
    width: 350,
    height: '100%'
  }
})

interface IProps {
  folders: IFolderMap
  currentFolderId: string
  onFolderClick: (id: string) => void
}

const CurrentFolder: React.FC<IProps> = ({
  folders,
  currentFolderId,
  onFolderClick
}) => {
  const styles = useStyles()
  const foldersList = Object.values(folders)
  const rootFolders = foldersList.filter(
    ({ parentFolderId, id }) => !parentFolderId && id !== ''
  )

  const nestFolder = (folder: IFolder): INestedFolder => ({
    ...folder,
    subFolders: foldersList
      .filter(({ parentFolderId }) => parentFolderId === folder.id)
      .map(nestFolder)
  })

  const hierarchy = rootFolders.map(nestFolder)

  return (
    <List className={styles.root}>
      <ListItem button onClick={() => onFolderClick('')}>
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
      </ListItem>

      {hierarchy.map((folder) => (
        <FolderListItem
          key={folder.id}
          folder={folder}
          onClick={onFolderClick}
        />
      ))}
    </List>
  )
}

export default CurrentFolder
