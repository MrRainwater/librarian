import { IBookmark } from 'interfaces'

export default class BookmarkCollection {
  public data: IBookmark[]

  constructor(data: IBookmark[]) {
    this.data = data
  }

  public [Symbol.iterator] = () => this.data[Symbol.iterator]()

  // public withTags = (tags: string[]) =>
  //   new BookmarkCollection(this.data.filter((b) => hasAny(b.tags, tags)))

  public titleContains = (text: string) =>
    new BookmarkCollection(
      this.data.filter((b) => (b.title || '').includes(text))
    )
}
