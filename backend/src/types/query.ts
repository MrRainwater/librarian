export default `
  type Query {
    bookmarks: [Bookmark]
    folders: [Folder]
    openFolder(folderId: String!): Folder
    metadata(url: String!): Metadata
  }
`
