import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton
} from '@material-ui/core'
import LabelIcon from '@material-ui/icons/Label'
import * as React from 'react'

interface IProps {
  onAddTag: (tag: string) => void
}

const AddTag: React.FC<IProps> = ({ onAddTag }) => {
  const [tag, setTag] = React.useState('')
  const [dialogOpen, setDialogOpen] = React.useState(false)

  function openDialog() {
    setDialogOpen(true)
  }

  function closeDialog() {
    setTag('')
    setDialogOpen(false)
  }

  function addTag() {
    closeDialog()
    onAddTag(tag)
  }

  return (
    <React.Fragment>
      <IconButton onClick={openDialog}>
        <LabelIcon />
      </IconButton>
      <Dialog open={dialogOpen} onClose={closeDialog}>
        <DialogTitle>Add Tag</DialogTitle>
        <input value={tag} onChange={(e) => setTag(e.target.value)} />
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={addTag}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default AddTag
