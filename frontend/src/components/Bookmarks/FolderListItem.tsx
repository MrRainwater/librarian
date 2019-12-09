import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import { Folder as FolderIcon } from '@material-ui/icons'
import { INestedFolder } from 'interfaces'
import * as React from 'react'

interface IProps {
  folder: INestedFolder
  onClick: (id: string) => void
}

const FolderListItem: React.FC<IProps> = ({ folder, onClick }) => {
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

export default FolderListItem
