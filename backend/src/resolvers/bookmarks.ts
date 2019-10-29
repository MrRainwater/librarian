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
    console.log(input)
    const model = await Bookmark.create(input)
    console.log(model)
    return model
  },
  bookmarks() {
    return Bookmark.find()
  }
}

export default resolvers
