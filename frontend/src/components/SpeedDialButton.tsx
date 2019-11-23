import * as React from 'react'
import Button from 'react-toolbox/lib/button'

const SpeedDialButton: React.FC = ({ children }) => {
  const [displayButtons, setDisplayButtons] = React.useState(false)

  function toggleDisplay() {
    setDisplayButtons((prev) => !prev)
  }

  return (
    <div className="speed-dial-button">
      <Button onClick={toggleDisplay} floating />
      {displayButtons && <div className="button-list">{children}</div>}
    </div>
  )
}
export default SpeedDialButton
