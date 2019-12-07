import { Box, Grid, Typography } from '@material-ui/core'
import { Folder as FolderIcon } from '@material-ui/icons'
import { IFolder } from 'interfaces'
import * as React from 'react'
import { IFolderMap } from 'stores/BookmarkStore'

interface IProps {
  folders: IFolderMap
  currentFolderId: string
  onFolderClick: (id: string) => void
}

const CurrentFolder: React.FC<IProps> = ({
  folders,
  currentFolderId,
  onFolderClick
}) => {
  let workingId = currentFolderId
  const hierarchy: IFolder[] = []
  while (workingId) {
    const folder = folders[workingId]!
    workingId = folder.parentFolderId
    hierarchy.unshift(folder)
  }

  return (
    <Box m={2}>
      <Grid container direction="row" spacing={2} alignItems="baseline">
        <Grid item>
          <FolderIcon onClick={() => onFolderClick('')} />
        </Grid>
        {hierarchy.map(({ name, id }) => (
          <Grid key={id} item>
            <Typography variant="h6" onClick={() => onFolderClick(id)}>
              {name} >
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default CurrentFolder
