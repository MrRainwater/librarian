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

interface Props {
  bookmark: IBookmark
  className?: string
}

const Bookmark: React.FunctionComponent<Props> = ({ bookmark, className }) => (
  <Card className={className}>
    <CardMedia image={bookmark.img} aspectRatio="wide" />
    <CardTitle title={bookmark.title} />
    <CardText>{bookmark.description}</CardText>
  </Card>
)

export default Bookmark
