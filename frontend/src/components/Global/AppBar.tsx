import { AppBar, Box, Toolbar, Typography } from '@material-ui/core'
import * as React from 'react'

const LibrarianAppBar: React.FunctionComponent = () => {
  return (
    <>
      <AppBar title="Librarian">
        <Toolbar>
          <Typography variant="h4">Librarian</Typography>
        </Toolbar>
      </AppBar>
      <Box mb={'64px'} />
    </>
  )
}

export default LibrarianAppBar
