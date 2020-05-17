import * as React from 'react'
import {
  ListItem,
  Box,
  Icon,
  ListItemText,
  ListItemIcon
} from '@material-ui/core'

interface IProps {
  icon: 'bookmark' | 'folder'
  title: string
  url?: string
}

const BookmarkListItem: React.FC<IProps> = ({ icon, title, url }) => (
  <ListItem>
    <Box p={1}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
    </Box>
    <Box ml={1}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <ListItemText primary={title} />
      </a>
    </Box>
  </ListItem>
)

export default BookmarkListItem
