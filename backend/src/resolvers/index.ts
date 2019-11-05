import bookmarkResolvers from './bookmarks'
import folderResolvers from './folders'

const resolvers = {
  ...bookmarkResolvers,
  ...folderResolvers
}

export default resolvers
