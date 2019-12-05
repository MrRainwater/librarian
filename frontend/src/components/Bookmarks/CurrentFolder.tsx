import { Box, Grid, Typography } from '@material-ui/core'
import { Folder as FolderIcon } from '@material-ui/icons'
import { IFolder } from 'interfaces'
import * as React from 'react'
import { useBookmarksStore } from 'stores/BookmarkStore'

const CurrentFolder: React.FC = () => {
  const [{ currentFolderId, folders }, dispatch] = useBookmarksStore()
  let workingId = currentFolderId
  const hierarchy: IFolder[] = []
  while (workingId) {
    const folder = folders.get(workingId)!
    workingId = folder.parentFolderId
    hierarchy.unshift(folder)
  }

  const openFolder = (folderId: string) =>
    dispatch({ type: 'OPEN_FOLDER', folderId })

  return (
    <Box m={2}>
      <Grid container direction="row" spacing={2} alignItems="baseline">
        <Grid item>
          <FolderIcon onClick={() => openFolder('')} />
        </Grid>
        {hierarchy.map(({ name, id }) => (
          <Grid item>
            <Typography variant="h6" onClick={() => openFolder(id)}>
              {name} >
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default CurrentFolder
