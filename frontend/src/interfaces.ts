export interface IBookmark {
  id: string
  url: string
  title: string
  description: string
  img: string
  tags: string[]
}

export type IBookmarkCreate = Pick<IBookmark, 'title' | 'description' | 'url'>

export interface IFolder {
  id: string
  name: string
  bookmarks: IBookmark[]
  subFolderIds: string[]
}
