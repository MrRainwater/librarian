import initBrowser from 'browser'
import { IBookmark } from 'interfaces'

const getNodes = (
  nodes: browser.bookmarks.IBookmarkTreeNode[] = []
): browser.bookmarks.IBookmarkTreeNode[] => {
  const children = nodes.flatMap((node) => getNodes(node.children))
  return [...nodes, ...children]
}

export const loadBookmarks = async () => {
  await initBrowser()
  const rootNodes = await browser.bookmarks.getTree()
  return getNodes(rootNodes).filter(
    (node): node is IBookmark => node.type === 'bookmark'
  )
}
