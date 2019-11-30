import { Folder as FolderIcon } from '@material-ui/icons'
import LibraryCard from 'components/Util/LibraryCard'
import { IFolder } from 'interfaces'
import * as React from 'react'

interface IProps {
  folder: IFolder
}

const Folder: React.FC<IProps> = ({ folder }) => (
  <LibraryCard title={folder.name} img={'/folder.png'} actions={null} />
)

export default Folder
