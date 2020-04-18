export default async function initBrowser() {
  if (process.env.NODE_ENV !== 'production') {
    const { folders } = await import('data')
    window.browser = {
      bookmarks: {
        getTree() {
          return Promise.resolve(folders)
        }
      }
    }
  }
}
