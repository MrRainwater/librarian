export default `
  type Query {
    bookmarks: [Bookmark]
    folders: [Folder]
    metadata(url: String!): Metadata
  }
`
