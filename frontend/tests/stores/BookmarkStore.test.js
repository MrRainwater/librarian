import { reducer, initialState } from 'stores/BookmarkStore'
import { BookmarkFactory } from 'factories/BookmarkFactory'

describe('BookmarkReducer', () => {
  it('add bookmark', () => {
    const bookmark = BookmarkFactory.build()

    const { bookmarks } = reducer(initialState, {
      type: 'ADD_BOOKMARK',
      bookmark
    })

    expect(bookmarks).toEqual([bookmark])
  })

  it('add tag', () => {
    const tag = 'tag'
    const bookmark = BookmarkFactory.build()
    const initialState = { bookmarks: [bookmark] }

    const { bookmarks } = reducer(initialState, {
      type: 'TAG_BOOKMARK_BY_TITLE',
      title: bookmark.title,
      tag
    })

    expect(bookmarks).toEqual([{ ...bookmark, tags: [tag] }])
  })
})
