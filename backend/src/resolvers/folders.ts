import Folder from '../models/Folder'

interface ICreateArgs {
  name: string
}

interface IMoveArgs {
  targetId: string
  destinationId: string
}

const resolvers = {
  folders() {
    return Folder.find()
  },
  createFolder({ name }: ICreateArgs) {
    return Folder.create({ name })
  },
  moveFolder({ targetId, destinationId }: IMoveArgs) {
    return Folder.findByIdAndUpdate(targetId, { parentFolderId: destinationId })
  }
}

export default resolvers
