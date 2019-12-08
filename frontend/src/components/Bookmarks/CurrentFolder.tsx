import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import { Folder as FolderIcon } from '@material-ui/icons'
import { IFolder, IFolderPreview } from 'interfaces'
import * as React from 'react'
import { IFolderMap } from 'stores/BookmarkStore'

interface IProps {
  folders: IFolderMap
  currentFolderId: string
  onFolderClick: (id: string) => void
}

interface INestedFolderProps {
  folder: INestedFolder
  onClick: (id: string) => void
}

interface INestedFolder extends IFolderPreview {
  subFolders: INestedFolder[]
}

interface INestedFolderMap {
  [name: string]: INestedFolder
}

const FolderListItem: React.FC<INestedFolderProps> = ({ folder, onClick }) => {
  const [openSubFolders, setOpenSubFolders] = React.useState(false)
  const toggle = () => {
    setOpenSubFolders(!openSubFolders)
    onClick(folder.id)
  }
  return (
    <>
      <ListItem button onClick={toggle}>
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary={folder.name} />
      </ListItem>
      {folder.subFolders.length ? (
        <Collapse in={openSubFolders}>
          <List>
            {folder.subFolders.map((subFolder) => (
              <FolderListItem folder={subFolder} onClick={onClick} />
            ))}
          </List>
        </Collapse>
      ) : null}
    </>
  )
}

const CurrentFolder: React.FC<IProps> = ({
  folders,
  currentFolderId,
  onFolderClick
}) => {
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
    <Box m={2}>
      <List>
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
    </Box>
  )
}

export default CurrentFolder
