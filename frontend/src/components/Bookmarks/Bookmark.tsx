import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import FolderIcon from '@material-ui/icons/Folder'
import LabelIcon from '@material-ui/icons/Label'
import LinkIcon from '@material-ui/icons/Link'
import LibraryCard from 'components/Util/LibraryCard'
import { IBookmark } from 'interfaces'
import * as React from 'react'
import { useDrag } from 'react-dnd'

interface IProps {
  bookmark: IBookmark
  folderId: string
}

export const bookmarkDragType = 'BOOKMARK'

const Bookmark: React.FunctionComponent<IProps> = ({ bookmark, folderId }) => {
  const [, dragRef] = useDrag({
    item: { type: bookmarkDragType, folderId, id: bookmark.id },
    collect: () => ({})
  })

  const actions = (
    <>
      <a href={bookmark.url} target="_blank">
        <IconButton>
          <LinkIcon />
        </IconButton>
      </a>
      <IconButton>
        <EditIcon />
      </IconButton>
      <IconButton>
        <LabelIcon />
      </IconButton>
      <IconButton>
        <FolderIcon />
      </IconButton>
    </>
  )
  return (
    <LibraryCard
      forwardRef={dragRef}
      title={bookmark.title}
      content={bookmark.description}
      img={bookmark.img}
      actions={actions}
    />
  )
}

export default Bookmark
