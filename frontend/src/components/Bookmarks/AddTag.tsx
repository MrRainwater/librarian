import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core'
import * as React from 'react'
import { IconButton } from 'react-toolbox/lib/button'

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
      <IconButton icon="label" onClick={openDialog} />
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
