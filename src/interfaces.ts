type IBookmarkTreeNode = browser.bookmarks.IBookmarkTreeNode

export interface IFolderNode extends IBookmarkTreeNode {
  children: IBookmarkTreeNode[]
  parentId: string
  type: 'folder'
  url?: never
}

export interface IBookmarkNode extends IBookmarkTreeNode {
  children: undefined
  parentId: string
  type: 'bookmark'
  url: string
}

export type IFolder = IFolderNode

export type IBookmark = IBookmarkNode

export interface INestedFolder extends IFolder {
  subFolders: INestedFolder[]
}
