let nextId = 1

function createBookmark({
  title,
  url,
  parentId
}: browser.bookmarks.IBookmarkCreateDetails): browser.bookmarks.IBookmarkTreeNode {
  return {
    id: `${nextId++}`,
    title,
    url,
    type: url ? 'bookmark' : 'folder',
    parentId,
    children: url ? undefined : []
  }
}

export default async function initBrowser() {
  if (process.env.NODE_ENV !== 'production') {
    const { folders } = await import('data')
    window.browser = {
      bookmarks: {
        getTree() {
          return Promise.resolve(folders)
        },
        move() {
          return Promise.resolve()
        },
        removeTree() {
          return Promise.resolve()
        },
        create(bookmark) {
          return Promise.resolve(createBookmark(bookmark))
        }
      }
    }
  }
}
