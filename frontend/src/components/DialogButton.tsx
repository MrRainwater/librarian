import * as React from 'react'
import Button from 'react-toolbox/lib/button'
import Dialog from 'react-toolbox/lib/dialog'

interface IProps {
  title: string
  confirmMessage?: string
}

const DialogButton: React.FC<IProps> = ({
  children,
  title,
  confirmMessage = 'Save'
}) => {
  const [openDialog, setOpenDialog] = React.useState(false)

  function toggleDialog() {
    setOpenDialog((val) => !val)
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
