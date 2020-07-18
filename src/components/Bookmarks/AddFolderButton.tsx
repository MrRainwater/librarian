import * as React from 'react'
import {
  Fab,
  Icon,
  Dialog,
  DialogTitle,
  TextField,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText
} from '@material-ui/core'

const AddFolderButton: React.FC = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [name, setName] = React.useState('')

  function handleClose() {
    setDialogOpen(false)
    setName('')
  }

  function createBookmark() {
    handleClose()
  }

  return (
    <>
      <Fab color="primary" onClick={() => setDialogOpen(!dialogOpen)}>
        <Icon>add</Icon>
      </Fab>
      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogTitle>Create Folder</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the name of the folder to be created
          </DialogContentText>
          <TextField
            fullWidth
            label="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={createBookmark} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AddFolderButton
