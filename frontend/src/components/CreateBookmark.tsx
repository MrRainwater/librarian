import * as React from 'react'
import Dialog from 'react-toolbox/lib/dialog'
import { IBookmarkCreate } from 'interfaces'
import Input from 'react-toolbox/lib/input'

interface Props {
  active: boolean
  onCancel: () => void
  onSave: (bookmark: any) => void
}

const CreateBookmark: React.FunctionComponent<Props> = ({
  active,
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

  const [bookmark, setBookmark] = React.useState<IBookmarkCreate>({
    title: '',
    description: '',
    url: ''
  })

  function mergeBookmark<T extends IBookmarkCreate, K extends keyof T>(key: K) {
    return (val: T[K]) =>
      setBookmark({
        ...bookmark,
        [key]: val
      })
  }

  return (
    <Dialog
      title="Create a bookmark"
      actions={actions}
      active={active}
      onEscKeyDown={onCancel}
      onOverlayClick={onCancel}
    >
      <Input
        type="text"
        label="url"
        value={bookmark.url}
        onChange={mergeBookmark('url')}
      />
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
    </Dialog>
  )
}

export default CreateBookmark
