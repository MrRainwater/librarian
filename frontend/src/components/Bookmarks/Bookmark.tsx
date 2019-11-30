import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import FolderIcon from '@material-ui/icons/Folder'
import LabelIcon from '@material-ui/icons/Label'
import LinkIcon from '@material-ui/icons/Link'
import LibraryCard from 'components/Util/LibraryCard'
import { IBookmark } from 'interfaces'
import * as React from 'react'

interface IProps {
  bookmark: IBookmark
}

const Bookmark: React.FunctionComponent<IProps> = ({ bookmark }) => {
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
      title={bookmark.title}
      content={bookmark.description}
      img={bookmark.img}
      actions={actions}
    />
  )
}

export default Bookmark
