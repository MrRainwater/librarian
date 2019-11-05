import Folder from '../models/Folder'

type CreateArgs = { name: string }

type MoveArgs = { targetId: string; destinationId: string }

const resolvers = {
  folders() {
    return Folder.find()
  },
  createFolder({ name }: CreateArgs) {
    return Folder.create({ name })
  },
  moveFolder({ targetId, destinationId }: MoveArgs) {
    return Folder.findByIdAndUpdate(targetId, { parentFolderId: destinationId })
  }
}

export default resolvers
