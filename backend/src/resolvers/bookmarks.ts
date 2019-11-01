import Bookmark from '../models/Bookmark'

interface IBookmarkInput {
  id: string
  url: string
  title: string
  description: string
}
type CreateArgs = { input: IBookmarkInput }
type TagArgs = { id: string; tag: string }

const resolvers = {
  async createBookmark({ input }: CreateArgs) {
    return await Bookmark.create(input)
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
  }
}

export default resolvers
