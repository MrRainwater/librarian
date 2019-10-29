import IFolder from './Folder'

export default interface IBookmark {
  url: string
  title: string
  description: string
  img: string
  folder?: IFolder
}
