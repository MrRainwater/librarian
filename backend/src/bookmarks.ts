import { readFileSync } from 'fs'

const bookmarks = JSON.parse(
  readFileSync('data/bookmarks.json').toString()
) as any[]

interface Bookmark {
  url: string
  title: string
  description: string
  img: string
}

export default class BookmarkStore {
  data: Bookmark[] = bookmarks.slice(0, 50)

  add(bookmark: Bookmark) {
    this.data.push(bookmark)
  }
}
