export default `
  type Query {
    bookmarks: [Bookmark]
    metadata(url: String!): Metadata
  }
`
