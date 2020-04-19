import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme
} from '@material-ui/core'
import { Folder as FolderIcon } from '@material-ui/icons'
import { useDropBookmark } from 'hooks/dragDrop'
import { INestedFolder } from 'interfaces'
import * as React from 'react'
import { useDrop } from 'react-dnd'
import { actions, useBookmarksStore } from 'stores/BookmarkStore'
import { bookmarkDragType } from './Bookmark'

interface IStyleProps {
  depth: number
  isOver: boolean
}

const useStyles = makeStyles<Theme, IStyleProps>((theme) => ({
  folderListItem: {
    paddingLeft: ({ depth }) => theme.spacing(depth * 2),
    background: ({ isOver }) =>
      isOver ? 'rgba(0, 0, 0, 0.08)' : theme.palette.background.default
  }
}))

interface IProps {
  folder: INestedFolder
  onClick: (id: string) => void
  depth?: number
}

const FolderListItem: React.FC<IProps> = ({ folder, onClick, depth = 0 }) => {
  const [{ currentFolderId }] = useBookmarksStore()
  const [{ isOver }, dropRef] = useDropBookmark(folder.id, () =>
    setIsOpen(true)
  )
  const styles = useStyles({ depth, isOver })
  const [isOpen, setIsOpen] = React.useState(false)
  const toggle = () => {
    setIsOpen(!isOpen)
    onClick(folder.id)
  }

  const hierarchyOpened = (currentFolder: INestedFolder): boolean => {
    if (currentFolderId === currentFolder.id) {
      return true
    } else {
      return currentFolder.subFolders.some((subFolder) =>
        hierarchyOpened(subFolder)
      )
    }
  }

  React.useEffect(() => {
    if (hierarchyOpened(folder)) {
      setIsOpen(true)
    }
  }, [folder])

  return (
    <>
      <ListItem
        ref={dropRef}
        className={styles.folderListItem}
        button
        onClick={toggle}
      >
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary={folder.title} />
      </ListItem>
      {folder.subFolders.length ? (
        <Collapse in={isOpen}>
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
