export default `
  type Bookmark {
    id: String
    url: String
    title: String
    description: String
    img: String
    tags: [String]
    folder: Folder
  }

  input BookmarkInput {
    url: String
    title: String
    description: String
    img: String
  }
`
