import * as React from 'react'
import { Button } from 'react-toolbox/lib/button'
import * as classes from './styles/NewBookmarkButton.scss'

interface IProps {
  onClick?: () => void
}

const NewBookmarkButton: React.FunctionComponent<IProps> = ({ onClick }) => (
  <Button
    className={classes.button}
    floating
    accent
    icon="add"
    onClick={onClick}
  />
)

export default NewBookmarkButton
