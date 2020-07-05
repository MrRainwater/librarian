import * as React from 'react'
import {
  ListItem,
  Box,
  Icon,
  ListItemText,
  ListItemIcon,
  makeStyles,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core'
import { useDragBookmark, useDropBookmark } from 'hooks/dragDrop'
import { useBookmarksStore, actions } from 'stores/BookmarkStore'

const useStyles = makeStyles(() => ({
  link: {
    color: 'inherit',
    textDecoration: 'inherit'
  },
  text: {
    cursor: 'pointer'
  }
}))

interface IProps {
  type: 'bookmark' | 'folder'
  title: string
  parentId: string
  id: string
  url?: string
  onClick?: () => void
}

const BookmarkListItem: React.FC<IProps> = ({
  id,
  parentId,
  type,
  title,
  url,
  onClick
}) => {
  const [, dispatch] = useBookmarksStore()
  const styles = useStyles()
  const dragRef = useDragBookmark(id, parentId)
  const [, dropRef] = useDropBookmark(id)
  const [dialogOpen, setDialogOpen] = React.useState(false)

  function attachRef(el: React.RefObject<unknown>) {
    dragRef(el)
    dropRef(el)
  }

  function openDialog() {
    setDialogOpen(true)
  }

  function closeDialog() {
    setDialogOpen(false)
  }

  function deleteBookmark() {
    closeDialog()
    dispatch(actions.removeNode({ id }))
  }

  return (
    <>
      <ListItem innerRef={attachRef}>
        <Box p={1}>
          <ListItemIcon>
            <Icon>{type}</Icon>
          </ListItemIcon>
        </Box>
        <Box ml={1}>
          <a
            className={styles.link}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ListItemText
              className={styles.text}
              primary={title}
              onClick={onClick}
            />
          </a>
          <ListItemSecondaryAction onClick={openDialog}>
            <IconButton>
              <Icon>delete</Icon>
            </IconButton>
          </ListItemSecondaryAction>
        </Box>
      </ListItem>
      <Dialog open={dialogOpen} onClose={closeDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete {title}</DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteBookmark} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default BookmarkListItem
