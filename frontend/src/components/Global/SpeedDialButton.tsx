import {
  Add as AddIcon,
  Bookmark as BookmarkIcon,
  Folder as FolderIcon
} from '@material-ui/icons'
import { SpeedDial, SpeedDialAction } from '@material-ui/lab'
import * as React from 'react'

const actions = [
  { icon: <BookmarkIcon />, name: 'Bookmark' },
  { icon: <FolderIcon />, name: 'Folder' }
]

const SpeedDialButton: React.FC = () => {
  const [displayButtons, setDisplayButtons] = React.useState(false)

  function toggleDisplay() {
    setDisplayButtons((prev) => !prev)
  }

  return (
    <SpeedDial
      ariaLabel="Add Button"
      open={displayButtons}
      direction="up"
      icon={<AddIcon />}
      onClick={toggleDisplay}
    >
      {actions.map(({ icon, name }) => (
        <SpeedDialAction
          key={name}
          icon={icon}
          tooltipTitle={name}
          tooltipOpen
        />
      ))}
    </SpeedDial>
  )
}
export default SpeedDialButton
