export default `
type Folder {
  id: String
  name: String
  bookmarks: [Bookmark]
  subFolders: [Folder]
  parentFolder: Folder
}
`
