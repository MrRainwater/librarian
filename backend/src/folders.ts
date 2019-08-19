import { Bookmark } from './bookmarks'

class Folder {
  name = ''
  bookmarks = []

  constructor(name: string) {
    this.name = name
  }
}

export default class FolderStore {
  data: Folder[] = []

  addFolder(folder: Folder) {
    this.data.push(folder)
  }

  find(name: string) {
    return this.data.find(folder => folder.name === name)
  }

  addBookmarkToFolder(name: string, bookmark: Bookmark) {
    this.find(name).bookmarks.push(bookmark)
  }
}
