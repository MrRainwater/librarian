import * as React from 'react'
import { act } from 'react-dom/test-utils'
import { useBookmarksStore } from 'stores/BookmarkStore'
import Main from 'components/Global/Main'
import { shallow, mount } from 'enzyme'
import { getInitial } from 'api'
import { BookmarkFactory } from '../../factories/BookmarkFactory'
import Bookmarks from 'components/Bookmarks/Bookmarks'
import BookmarkFilter from 'components/Global/BookmarkFilter'

jest.mock('stores/BookmarkStore')
jest.mock('api')

describe('Main', () => {
  beforeEach(() => {
    useBookmarksStore.mockReturnValue([{ bookmarks: [] }, jest.fn()])
    getInitial.mockResolvedValue({ folders: [], bookmarks: [] })
  })

  describe('load', () => {
    it('dispatches and sets bookmarks', async () => {
      const bookmarks = [BookmarkFactory.build(), BookmarkFactory.build()]
      getBookmarks.mockResolvedValue(bookmarks)
      const dispatch = jest.fn()
      useBookmarksStore.mockReturnValue([{ bookmarks: [] }, dispatch])
      let component

      await act(async () => {
        component = mount(<Main />)
      })
      component.update()

      expect(dispatch).toBeCalledWith({ type: 'SET_BOOKMARKS', bookmarks })
      expect(component.find(Bookmarks)).toHaveProp({ bookmarks })
    })
  })

  describe('BookmarkFilter', () => {
    it('passed bookmarks from store', () => {
      const bookmarks = [BookmarkFactory.build(), BookmarkFactory.build()]
      useBookmarksStore.mockReturnValue([{ bookmarks }, jest.fn()])
      const component = shallow(<Main />)

      expect(component.find(BookmarkFilter)).toHaveProp({ bookmarks })
    })

    it('changes filtered bookmarks', () => {
      const [bookmark1, bookmark2] = [
        BookmarkFactory.build(),
        BookmarkFactory.build()
      ]
      useBookmarksStore.mockReturnValue([
        { bookmarks: [bookmark1, bookmark2] },
        jest.fn()
      ])
      const component = shallow(<Main />)

      component.find(BookmarkFilter).prop('onResults')([bookmark1])

      expect(component.find(Bookmarks)).toHaveProp({ bookmarks: [bookmark1] })
    })
  })
})
