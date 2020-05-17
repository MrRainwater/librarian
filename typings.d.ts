declare module '*.scss' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames
  export = classNames
}

declare namespace browser.bookmarks {
  export interface IBookmarkTreeNode {
    id: string
    title: string
    url?: string
    type: 'folder' | 'bookmark'
    parentId?: string
    children?: IBookmarkTreeNode[]
    dateAdded?: number
    dateGroupModified?: number
    index?: number
    unmodifiable?: string
  }

  function getTree(): Promise<IBookmarkTreeNode[]>
}