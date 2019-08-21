import * as React from 'react'
import Dialog from 'react-toolbox/lib/dialog'
import Button from 'react-toolbox/lib/button'

interface Props {
  title: string
  confirmMessage?: string
}

const DialogButton: React.FC<Props> = ({
  children,
  title,
  confirmMessage = 'Save'
}) => {
  const [openDialog, setOpenDialog] = React.useState(false)

  function toggleDialog() {
    setOpenDialog(val => !val)
  }

  const actions = [
    { label: 'Cancel', onClick: toggleDialog },
    { label: confirmMessage, onClick: toggleDialog }
  ]

  return (
    <>
      <Button onClick={toggleDialog} />
      <Dialog
        actions={actions}
        active={openDialog}
        onEscKeyDown={toggleDialog}
        onOverlayClick={toggleDialog}
        title={title}
      >
        {children}
      </Dialog>
    </>
  )
}

export default DialogButton
