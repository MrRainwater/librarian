import { IBookmark } from 'interfaces'

function hasAny<T>(collection: T[], values: T[]) {
  return values.reduce(
    (hasAny, value) => hasAny && collection.includes(value),
    true
  )
}

export default class BookmarkCollection {
  data: IBookmark[]

  constructor(data: IBookmark[]) {
    this.data = data
  }

  [Symbol.iterator] = () => this.data[Symbol.iterator]()

  withTags = (tags: string[]) =>
    new BookmarkCollection(this.data.filter(b => hasAny(b.tags, tags)))
}
