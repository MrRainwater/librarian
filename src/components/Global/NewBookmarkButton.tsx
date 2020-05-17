import { Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import * as React from 'react'
import * as classes from './styles/NewBookmarkButton.scss'

interface IProps {
  onClick?: () => void
}

const NewBookmarkButton: React.FunctionComponent<IProps> = ({ onClick }) => (
  <Fab className={classes.button} onClick={onClick}>
    <AddIcon />
  </Fab>
)

export default NewBookmarkButton
