import { readFileSync } from 'fs'

const bookmarks = JSON.parse(
  readFileSync('data/bookmarks.json').toString()
) as Bookmark[]

interface Bookmark {
  url: string
  title: string
  description: string
  img: string
}

export default class BookmarkStore {
  data: Bookmark[] = bookmarks.reduce<Bookmark[]>(
    (unique, current) =>
      unique.find(b => b.title === current.title)
        ? unique
        : [...unique, current],
    []
  )

  add(bookmark: Bookmark) {
    this.data.push(bookmark)
  }
}
