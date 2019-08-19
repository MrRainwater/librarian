export default `
  type Mutation {
    createBookmark(input: BookmarkInput): Bookmark
    createFolder(name: String): Folder
    tagBookmark(id: String, tag: String): Bookmark
    folderBookmark(id: String, folder: String): Bookmark
  }
`
