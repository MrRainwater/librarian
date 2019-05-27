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

class Bookmark implements IBookmark {
  url = ''
  title = ''
  description = ''
  img = ''
  tags: string[] = []
  folders: string[] = []

  constructor(data: IBookmark) {
    Object.assign(this, data)
  }
}

export default class BookmarkStore {
  data: Bookmark[] = bookmarks.reduce<Bookmark[]>(
    (unique, current) =>
      unique.find(b => b.title === current.title)
        ? unique
        : [...unique, new Bookmark(current)],
    []
  )

  add(bookmark: Bookmark) {
    this.data.push(bookmark)
  }

  find(id: string) {
    return this.data.find(b => b.title === id)
  }

  addTag(id: string, tag: string) {
    const bookmark = this.find(id)
    bookmark.tags.push(tag)
    return bookmark
  }

  addFolder(id: string, folder: string) {
    const bookmark = this.find(id)
    bookmark.folders.push(folder)
    return bookmark
  }
}
