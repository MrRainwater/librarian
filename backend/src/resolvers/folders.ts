import Folder from '../models/Folder'

interface ICreateArgs {
  name: string
}

interface IOpenArgs {
  folderId: string
}

interface IDeleteArgs {
  folderId: string
}

interface IMoveArgs {
  targetId: string
  destinationId: string
}

const resolvers = {
  folders() {
    return Folder.find({ parentFolderId: null })
  },
  openFolder({ folderId }: IOpenArgs) {
    return Folder.findById(folderId)
  },
  createFolder({ name }: ICreateArgs) {
    return Folder.create({ name })
  },
  moveFolder({ targetId, destinationId }: IMoveArgs) {
    return Folder.findByIdAndUpdate(targetId, { parentFolderId: destinationId })
  },
  deleteFolder({ folderId }: IDeleteArgs) {
    return Folder.findByIdAndDelete(folderId)
  }
}

export default resolvers
