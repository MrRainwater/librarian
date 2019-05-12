import { reducer, initialState } from 'stores/BookmarkStore'

describe('BookmarkReducer', () => {
  it('add bookmark', () => {
    const bookmark = { title: 'title' }

    const { bookmarks } = reducer(initialState, {
      type: 'ADD_BOOKMARK',
      bookmark
    })

    expect(bookmarks).toEqual([bookmark])
  })

  it('add tag', () => {
    const tag = 'tag'
    const title = 'title'
    const bookmark = { title, tags: [] }
    const initialState = { bookmarks: [bookmark] }

    const { bookmarks } = reducer(initialState, {
      type: 'TAG_BOOKMARK_BY_TITLE',
      title,
      tag
    })

    expect(bookmarks).toEqual([{ title: 'title', tags: [tag] }])
  })
})
