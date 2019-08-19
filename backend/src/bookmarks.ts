import { readFileSync } from 'fs'

const bookmarks = JSON.parse(
  readFileSync('data/bookmarks.json').toString()
) as IBookmark[]

interface IBookmark {
  url: string
  title: string
  description: string
  img: string
}

export class Bookmark implements IBookmark {
  id = ''
  url = ''
  title = ''
  description = ''
  img = ''
  tags: string[] = []
  folders: string[] = []

  constructor(data: IBookmark) {
    Object.assign(this, data)
    this.id = data.url
  }
}

class Folder {
  name = ''
  bookmarks = []

  constructor(name: string) {
    this.name = name
  }
}

export default class BookmarkStore {
  bookmarks: Bookmark[] = bookmarks.reduce<Bookmark[]>(
    (unique, current) =>
      unique.find(b => b.title === current.title)
        ? unique
        : [...unique, new Bookmark(current)],
    []
  )
  folders: Folder[] = []

  add(bookmark: Bookmark) {
    this.bookmarks.push(bookmark)
  }

  find(id: string) {
    return this.bookmarks.find(b => b.title === id)
  }

  findFolder(name: string) {
    return this.folders.find(f => f.name === name)
  }

  addTag(id: string, tag: string) {
    const bookmark = this.find(id)
    bookmark.tags.push(tag)
    return bookmark
  }

  createFolder(name: string) {
    const folder = new Folder(name)
    this.folders.push(folder)
    return folder
  }

  addFolder(id: string, folderName: string) {
    const bookmark = this.find(id)
    const folder = this.findFolder(folderName)
    bookmark.folders.push(folderName)
    folder.bookmarks.push(bookmark)
    return bookmark
  }
}
