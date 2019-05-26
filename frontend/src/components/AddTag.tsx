import * as React from 'react'
import { IconButton } from 'react-toolbox/lib/button'
import Dialog from 'react-toolbox/lib/dialog'
import Input from 'react-toolbox/lib/input'

interface Props {
  onAddTag: (tag: string) => void
}

const AddTag: React.FC<Props> = ({ onAddTag }) => {
  const [tag, setTag] = React.useState('')
  const [dialogOpen, setDialogOpen] = React.useState(false)

  function openDialog() {
    setDialogOpen(true)
  }

  function closeDialog() {
    setTag('')
    setDialogOpen(false)
  }

  function addTag(tag: string) {
    closeDialog()
    onAddTag(tag)
  }

  const dialogActions = [
    { label: 'Save', onClick: addTag },
    { label: 'Cancel', onClick: closeDialog }
  ]

  return (
    <React.Fragment>
      <IconButton icon="label" onClick={openDialog} />
      <Dialog
        title="Add Tag"
        active={dialogOpen}
        onEscKeyDown={closeDialog}
        onOverlayClick={closeDialog}
        actions={dialogActions}
      >
        <input value={tag} onChange={e => setTag(e.target.value)} />
      </Dialog>
    </React.Fragment>
  )
}

export default AddTag
