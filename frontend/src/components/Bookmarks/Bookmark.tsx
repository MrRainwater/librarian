import { IBookmark } from 'interfaces'
import * as React from 'react'
import { IconButton } from 'react-toolbox/lib/button'
import {
  Card,
  CardActions,
  CardMedia,
  CardText,
  CardTitle
} from 'react-toolbox/lib/card'
import * as classes from './styles/Bookmarks.scss'

interface IProps {
  bookmark: IBookmark
}

const Bookmark: React.FunctionComponent<IProps> = ({ bookmark }) => (
  <Card className={classes.bookmark}>
    <CardTitle className={classes.title} title={bookmark.title} />
    <CardMedia image={bookmark.img} aspectRatio="wide" />
    <CardText className={classes.content}>{bookmark.description}</CardText>
    <CardActions className={classes.actions}>
      <a href={bookmark.url} target="_blank">
        <IconButton icon="link" />
      </a>
      <IconButton icon="edit" />
      <IconButton icon="label" />
      <IconButton icon="folder" />
    </CardActions>
  </Card>
)

export default Bookmark
