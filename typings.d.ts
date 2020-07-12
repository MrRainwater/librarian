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

  export interface IBookmarkDestination {
    parentId: string
    index?: number
  }

  function move(id: string, destination: IBookmarkDestination): Promise<void>

  export interface IBookmarkCreateDetails {
    title: string
    parentId: string
    url?: string
  }

  function create(bookmark: IBookmarkCreateDetails): Promise<IBookmarkTreeNode>

  function removeTree(id: string): Promise<void>
}

declare namespace browser.tabs {
  export interface ITab {
    title: string
    url: string
  }

  function query(params: { active: true; currentWindow: true }): Promise<ITab[]>
}
