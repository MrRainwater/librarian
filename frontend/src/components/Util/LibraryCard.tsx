import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  makeStyles
} from '@material-ui/core'
import { useTheme } from '@material-ui/styles'
import * as React from 'react'

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
  content?: string
  actions: React.ReactNode
  onClick?: () => void
}
const LibraryCard: React.FC<IProps> = ({
  title,
  img,
  content,
  actions,
  onClick
}) => {
  const theme = useTheme()
  const styles = useStyles(theme)
  return (
    <Card className={styles.root} onClick={onClick}>
      <CardHeader className={styles.title} title={title} />
      <CardMedia className={styles.media} image={img} />
      {content && <CardContent>{content}</CardContent>}
      <CardActions>{actions}</CardActions>
    </Card>
  )
}

export default LibraryCard