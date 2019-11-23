import { Fab } from '@material-ui/core'
import * as React from 'react'

const SpeedDialButton: React.FC = ({ children }) => {
  const [displayButtons, setDisplayButtons] = React.useState(false)

  function toggleDisplay() {
    setDisplayButtons((prev) => !prev)
  }

  return (
    <div className="speed-dial-button">
      <Fab onClick={toggleDisplay} />
      {displayButtons && <div className="button-list">{children}</div>}
    </div>
  )
}
export default SpeedDialButton
