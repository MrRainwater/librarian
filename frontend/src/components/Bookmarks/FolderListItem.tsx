import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles
} from '@material-ui/core'
import { Folder as FolderIcon } from '@material-ui/icons'
import { INestedFolder } from 'interfaces'
import * as React from 'react'

const useStyles = makeStyles((theme) => ({
  folderListItem: {
    paddingLeft: ({ depth }: { depth: number }) => theme.spacing(depth * 2)
  }
}))

interface IProps {
  folder: INestedFolder
  onClick: (id: string) => void
  depth?: number
}

const FolderListItem: React.FC<IProps> = ({ folder, onClick, depth = 0 }) => {
  const styles = useStyles({ depth })
  const [openSubFolders, setOpenSubFolders] = React.useState(false)
  const toggle = () => {
    setOpenSubFolders(!openSubFolders)
    onClick(folder.id)
  }
  return (
    <>
      <ListItem className={styles.folderListItem} button onClick={toggle}>
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary={folder.name} />
      </ListItem>
      {folder.subFolders.length ? (
        <Collapse in={openSubFolders}>
          <List>
            {folder.subFolders.map((subFolder) => (
              <FolderListItem
                key={subFolder.id}
                folder={subFolder}
                onClick={onClick}
                depth={depth + 1}
              />
            ))}
          </List>
        </Collapse>
      ) : null}
    </>
  )
}

export default FolderListItem
