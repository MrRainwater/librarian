import { List, makeStyles } from '@material-ui/core'
import * as React from 'react'

const useStyles = makeStyles({
  folderList: {
    width: 350,
    height: '100%'
  }
})

const FolderList: React.FC = () => {
  const styles = useStyles()
  return <List className={styles.folderList} />
}

export default FolderList
