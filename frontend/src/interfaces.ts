export interface IBookmark {
  id: string
  url: string
  title: string
  description: string
  img: string
  tags: string[]
}

export type IBookmarkCreate = Pick<IBookmark, 'title' | 'description' | 'url'>

export interface IFolderPreview {
  id: string
  name: string
  parentFolderId: string
}

export interface IFolderFull extends IFolderPreview {
  bookmarks: IBookmark[]
}

export type IFolder = IFolderPreview | IFolderFull

export interface INestedFolder extends IFolderPreview {
  subFolders: INestedFolder[]
}
