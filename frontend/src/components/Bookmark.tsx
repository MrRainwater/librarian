import * as React from 'react'
import {
  Card,
  CardMedia,
  CardTitle,
  CardText,
  CardActions
} from 'react-toolbox/lib/card'
import { IBookmark } from 'interfaces'
import { IconButton } from 'react-toolbox/lib/button'
import * as classes from './styles/Bookmarks.scss'

interface Props {
  bookmark: IBookmark
  className?: string
}

const Bookmark: React.FunctionComponent<Props> = ({ bookmark, className }) => (
  <Card className={classes.bookmark}>
    <CardTitle className={classes.title} title={bookmark.title} />
    <CardMedia image={bookmark.img} aspectRatio="wide" />
    <CardText className={classes.content}>{bookmark.description}</CardText>
    <CardActions className={classes.actions}>
      <a href={bookmark.url} target="_blank">
        <IconButton icon="link" />
      </a>
    </CardActions>
  </Card>
)

export default Bookmark
