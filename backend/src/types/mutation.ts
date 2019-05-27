export default `
  type Mutation {
    createBookmark(input: BookmarkInput): Bookmark
    tagBookmark(id: String, tag: String): Bookmark
    folderBookmark(id: String, folder: String): Bookmark
  }
`
