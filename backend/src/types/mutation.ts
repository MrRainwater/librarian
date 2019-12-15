export default `
  type Mutation {
    createBookmark(input: BookmarkInput): Bookmark
    createFolder(name: String): Folder
    tagBookmark(id: String, tag: String): Bookmark
    moveBookmark(bookmarkId: String, folderId: String): Folder
    moveFolder(targetId: String, destinationId: String): Folder
    unfolderBookmark(bookmarkId: String): Bookmark
    deleteFolder(folderId: String): Folder
  }
`
