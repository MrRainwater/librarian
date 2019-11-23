import { createBookmark } from 'api'
import { useBookmarks } from 'hooks'
import { IBookmark } from 'interfaces'
import * as React from 'react'
import Dialog from 'react-toolbox/lib/dialog'
import Input from 'react-toolbox/lib/input'

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
  const actions = [
    {
      label: 'Save',
      onClick: () => save()
    },
    {
      label: 'Cancel',
      onClick: onCancel
    }
  ]

  function save() {
    createBookmark(bookmark)
    setBookmarks([...bookmarks, bookmark])
    onSave(bookmark)
  }

  const [bookmark, setBookmark] = React.useState<IBookmark>(metadata)
  const [bookmarks, setBookmarks] = useBookmarks()

  function mergeBookmark<T extends IBookmark, K extends keyof T>(key: K) {
    return (val: T[K]) =>
      setBookmark({
        ...bookmark,
        [key]: val
      })
  }

  return (
    <Dialog
      active={true}
      title="Create a bookmark"
      actions={actions}
      onEscKeyDown={onCancel}
      onOverlayClick={onCancel}
    >
      <Input
        type="text"
        label="title"
        value={bookmark.title}
        onChange={mergeBookmark('title')}
      />

      <Input
        type="text"
        label="description"
        value={bookmark.description}
        onChange={mergeBookmark('description')}
      />

      <Input
        type="text"
        label="url"
        value={bookmark.url}
        onChange={mergeBookmark('url')}
      />

      <Input
        type="text"
        label="img"
        value={bookmark.img}
        onChange={mergeBookmark('img')}
      />
    </Dialog>
  )
}

export default CreateBookmarkDialog
