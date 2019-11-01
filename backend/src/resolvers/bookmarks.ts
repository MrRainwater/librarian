import Bookmark from '../models/Bookmark'

interface IBookmarkInput {
  id: string
  url: string
  title: string
  description: string
}
type CreateArgs = { input: IBookmarkInput }

const resolvers = {
  async createBookmark({ input }: CreateArgs) {
    return await Bookmark.create(input)
  },
  bookmarks() {
    return Bookmark.find()
  }
}

export default resolvers
