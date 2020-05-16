import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@material-ui/core'
import { createBookmark } from 'api'
import { useBookmarks } from 'hooks'
import { IBookmark } from 'interfaces'
import * as React from 'react'

const Spacer = () => <Box mb={4} />
interface IProps {
  metadata: IBookmark
  onCancel: () => void
  onSave: (bookmark: IBookmark) => void
}

const CreateBookmarkDialog: React.FunctionComponent<IProps> = ({
  metadata,
  onCancel,
  onSave
}) => {
  const [bookmark, setBookmark] = React.useState<IBookmark>(metadata)
  const [bookmarks, setBookmarks] = useBookmarks()
  function save() {
    createBookmark(bookmark)
    setBookmarks([...bookmarks, bookmark])
    onSave(bookmark)
  }

  function mergeBookmark<T extends IBookmark, K extends keyof T>(key: K) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setBookmark({
        ...bookmark,
        [key]: e.target.value
      })
  }

  return (
    <Dialog open={true} fullWidth>
      <DialogTitle>Create a Bookmark</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="title"
          value={bookmark.title}
          onChange={mergeBookmark('title')}
        />
        <Spacer />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="url"
          value={bookmark.url}
          onChange={mergeBookmark('url')}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={save}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateBookmarkDialog
