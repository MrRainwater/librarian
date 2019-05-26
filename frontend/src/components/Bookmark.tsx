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
import AddTag from './AddTag'

interface Props {
  bookmark: IBookmark
}

const Bookmark: React.FunctionComponent<Props> = ({ bookmark }) => (
  <Card className={classes.bookmark}>
    <CardTitle className={classes.title} title={bookmark.title} />
    <CardMedia image={bookmark.img} aspectRatio="wide" />
    <CardText className={classes.content}>{bookmark.description}</CardText>
    <CardActions className={classes.actions}>
      <a href={bookmark.url} target="_blank">
        <IconButton icon="link" />
      </a>
      <AddTag onAddTag={() => null} />
    </CardActions>
  </Card>
)

export default Bookmark
