import Bookmark from '../models/Bookmark'
import Folder from '../models/Folder'
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

interface IMetadataArgs {
  url: string
}

const resolvers = {
  createBookmark({ input }: ICreateArgs) {
    return Bookmark.create(input)
  },
  bookmarks() {
    return Bookmark.find({ folderId: null })
  },
  tagBookmark({ id, tag }: ITagArgs) {
    return Bookmark.findByIdAndUpdate(
      id,
      { $push: { tags: tag } },
      { new: true }
    )
  },
  async moveBookmark({ bookmarkId, folderId }: IMoveArgs) {
    await Bookmark.findByIdAndUpdate(bookmarkId, { folderId }, { new: true })
    return Folder.findById(folderId)
  },
  unfolderBookmark({ bookmarkId }: { bookmarkId: string }) {
    return Bookmark.findByIdAndUpdate(
      bookmarkId,
      { folderId: null },
      { new: true }
    )
  },
  metadata: ({ url }: IMetadataArgs) => {
    return getMetadata(url)
  }
}

export default resolvers
