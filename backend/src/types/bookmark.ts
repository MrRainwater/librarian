export default `
  type Bookmark {
    url: String
    title: String
    description: String
    img: String
    tags: [String]
    folders: [String]
  }

  input BookmarkInput {
    url: String
    title: String
    description: String
    img: String
  }
`
