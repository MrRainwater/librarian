import Bookmark from '../models/Bookmark'
import { getMetadata } from '../scraper'

interface IBookmarkInput {
  id: string
  url: string
  title: string
  description: string
}

interface ICreateArgs {
  input: IBookmarkInput
}

interface ITagArgs {
  id: string
  tag: string
}

interface IMoveArgs {
  bookmarkId: string
  folderId: string
}

const resolvers = {
  createBookmark({ input }: ICreateArgs) {
    return Bookmark.create(input)
  },
  bookmarks() {
    return Bookmark.find()
  },
  tagBookmark({ id, tag }: ITagArgs) {
    return Bookmark.findByIdAndUpdate(
      id,
      { $push: { tags: tag } },
      { new: true }
    )
  },
  moveBookmark({ bookmarkId, folderId }: IMoveArgs) {
    return Bookmark.findByIdAndUpdate(bookmarkId, { folderId }, { new: true })
  },
  metadata: ({ url }) => {
    return getMetadata(url)
  }
}

export default resolvers
