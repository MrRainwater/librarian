import Bookmark from '../models/Bookmark'

interface IBookmarkInput {
  id: string
  url: string
  title: string
  description: string
}
type CreateArgs = { input: IBookmarkInput }
type TagArgs = { id: string; tag: string }
type MoveArgs = { bookmarkId: string; folderId: string }

const resolvers = {
  createBookmark({ input }: CreateArgs) {
    return Bookmark.create(input)
  },
  bookmarks() {
    return Bookmark.find()
  },
  tagBookmark({ id, tag }: TagArgs) {
    return Bookmark.findByIdAndUpdate(
      id,
      { $push: { tags: tag } },
      { new: true }
    )
  },
  moveBookmark({ bookmarkId, folderId }: MoveArgs) {
    return Bookmark.findByIdAndUpdate(bookmarkId, { folderId }, { new: true })
  }
}

export default resolvers
