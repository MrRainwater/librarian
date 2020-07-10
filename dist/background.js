browser.browserAction.onClicked.addListener(() => {
  browser.tabs.create({
    url: 'index.html'
  })
})

browser.pageAction.onClicked.addListener(async (tab) => {
  browser.bookmarks.create({
    url: tab.url,
    title: tab.title
  })
})
