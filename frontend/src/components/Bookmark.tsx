import * as React from 'react'
import * as classes from './styles/Bookmarks.scss'
import {
  Card,
  CardMedia,
  CardTitle,
  CardText,
  CardActions
} from 'react-toolbox/lib/card'
import { IBookmark } from 'interfaces'
import { IconButton } from 'react-toolbox/lib/button'

interface Props {
  bookmark: IBookmark
  className?: string
}

const Bookmark: React.FunctionComponent<Props> = ({ bookmark, className }) => (
  <Card className={className}>
    <CardMedia image={bookmark.img} aspectRatio="wide" />
    <CardTitle title={bookmark.title} />
    <CardText>{bookmark.description}</CardText>
    <CardActions>
      <a href={bookmark.url} target="_blank">
        <IconButton icon="link" />
      </a>
    </CardActions>
  </Card>
)

export default Bookmark
