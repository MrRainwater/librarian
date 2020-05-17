import * as React from 'react'
import { act } from 'react-dom/test-utils'
import { useBookmarksStore } from 'stores/BookmarkStore'
import Main from 'components/Global/Main'
import { shallow, mount } from 'enzyme'
import { BookmarkFactory } from '../../factories/BookmarkFactory'
import Bookmarks from 'components/Bookmarks/Bookmarks'

jest.mock('stores/BookmarkStore')

describe('Main', () => {
  beforeEach(() => {
    useBookmarksStore.mockReturnValue([{ bookmarks: [] }, jest.fn()])
  })

  describe('load', () => {
    it('dispatches and sets bookmarks', async () => {
      const bookmarks = [BookmarkFactory.build(), BookmarkFactory.build()]
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
})
