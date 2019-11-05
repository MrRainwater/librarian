import Folder from '../models/Folder'
import Bookmark from '../models/Bookmark'
type CreateArgs = { name: string }

const resolvers = {
  folders() {
    return Folder.find()
  },
  createFolder({ name }: CreateArgs) {
    return Folder.create({ name })
  }
}

export default resolvers
