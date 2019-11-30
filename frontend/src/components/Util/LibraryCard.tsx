import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  makeStyles
} from '@material-ui/core'
import * as React from 'react'
import { useTheme } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexBasis: '350px',
    marginBottom: theme.spacing(4)
  },
  title: {
    height: '75px'
  },
  media: {
    height: '250px'
  }
}))

interface IProps {
  title: string
  img: string
  content: string
  actions: React.ReactNode
}
const LibraryCard: React.FC<IProps> = ({ title, img, content, actions }) => {
  const theme = useTheme()
  const styles = useStyles(theme)
  return (
    <Card className={styles.root}>
      <CardHeader className={styles.title} title={title} />
      <CardMedia className={styles.media} image={img} />
      <CardContent>{content}</CardContent>
      <CardActions>{actions}</CardActions>
    </Card>
  )
}

export default LibraryCard
