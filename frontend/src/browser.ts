import { IFolderNode } from 'interfaces'

export default async function initBrowser() {
  if (process.env.NODE_ENV !== 'production') {
    const data: browser.bookmarks.IBookmarkTreeNode[] = await require('data.json')
    window.browser = {
      bookmarks: {
        getTree() {
          return Promise.resolve(data)
        }
      }
    }
  }
}
