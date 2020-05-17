import * as React from 'react'
import {
  ListItem,
  Box,
  Icon,
  ListItemText,
  ListItemIcon,
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles(() => ({
  link: {
    color: 'inherit',
    textDecoration: 'inherit'
  }
}))

interface IProps {
  type: 'bookmark' | 'folder'
  title: string
  url?: string
}

const BookmarkListItem: React.FC<IProps> = ({ type, title, url }) => {
  const styles = useStyles()

  return (
    <ListItem>
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
          <ListItemText primary={title} />
        </a>
      </Box>
    </ListItem>
  )
}

export default BookmarkListItem
