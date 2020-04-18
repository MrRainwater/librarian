import { IFolderNode } from 'interfaces'

export default async function initBrowser() {
  if (process.env.NODE_ENV !== 'production') {
    const {
      folders
    }: {
      folders: browser.bookmarks.IBookmarkTreeNode[]
    } = await require('data.ts')
    window.browser = {
      bookmarks: {
        getTree() {
          return Promise.resolve(folders)
        }
      }
    }
  }
}
