import * as React from 'react'
import {
  ListItem,
  Box,
  Icon,
  ListItemText,
  ListItemIcon,
  makeStyles,
  ListItemSecondaryAction,
  IconButton
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

  function attachRef(el: React.RefObject<unknown>) {
    dragRef(el)
    dropRef(el)
  }

  return (
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
          <ListItemSecondaryAction
            onClick={() => dispatch(actions.removeNode({ id }))}
          >
            <IconButton>
              <Icon>delete</Icon>
            </IconButton>
          </ListItemSecondaryAction>
        </a>
      </Box>
    </ListItem>
  )
}

export default BookmarkListItem
