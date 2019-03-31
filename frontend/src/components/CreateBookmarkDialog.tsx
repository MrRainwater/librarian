import * as React from 'react'
import Dialog from 'react-toolbox/lib/dialog'
import { IBookmark } from 'interfaces'
import Input from 'react-toolbox/lib/input'

interface Props {
  metadata: IBookmark
  onCancel: () => void
  onSave: (bookmark: IBookmark) => void
}

const CreateBookmarkDialog: React.FunctionComponent<Props> = ({
  metadata,
  onCancel,
  onSave
}) => {
  const actions = [
    {
      label: 'Save',
      onClick: () => onSave(bookmark)
    },
    {
      label: 'Cancel',
      onClick: onCancel
    }
  ]

  const [bookmark, setBookmark] = React.useState<IBookmark>(metadata)

  function mergeBookmark<T extends IBookmark, K extends keyof T>(key: K) {
    return (val: T[K]) =>
      setBookmark({
        ...bookmark,
        [key]: val
      })
  }

  console.log(bookmark)

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

      <Input
        type="text"
        label="logo"
        value={bookmark.logo}
        onChange={mergeBookmark('logo')}
      />
    </Dialog>
  )
}

export default CreateBookmarkDialog
