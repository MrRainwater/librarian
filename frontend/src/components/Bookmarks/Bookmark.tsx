import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import FolderIcon from '@material-ui/icons/Folder'
import LabelIcon from '@material-ui/icons/Label'
import LinkIcon from '@material-ui/icons/Link'
import { IBookmark } from 'interfaces'
import * as React from 'react'
import * as classes from './styles/Bookmarks.scss'

interface IProps {
  bookmark: IBookmark
}

const Bookmark: React.FunctionComponent<IProps> = ({ bookmark }) => (
  <Card className={classes.bookmark}>
    <CardHeader className={classes.title} title={bookmark.title} />
    <CardMedia className={classes.media} image={bookmark.img} />
    <CardContent className={classes.content}>
      {bookmark.description}
    </CardContent>
    <CardActions className={classes.actions}>
      <a href={bookmark.url} target="_blank">
        <IconButton>
          <LinkIcon />
        </IconButton>
      </a>
      <IconButton>
        <EditIcon />
      </IconButton>
      <IconButton>
        <LabelIcon />
      </IconButton>
      <IconButton>
        <FolderIcon />
      </IconButton>
    </CardActions>
  </Card>
)

export default Bookmark
