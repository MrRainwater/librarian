import * as React from 'react'
import {
  ListItem,
  Box,
  Icon,
  ListItemText,
  ListItemIcon,
  makeStyles
} from '@material-ui/core'
import { useDragBookmark, useDropBookmark } from 'hooks/dragDrop'

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
        </a>
      </Box>
    </ListItem>
  )
}

export default BookmarkListItem
