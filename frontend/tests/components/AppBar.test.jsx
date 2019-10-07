import * as React from 'react'
import { BookmarkFactory } from '../factories/BookmarkFactory'
import { shallow } from 'enzyme'
import NewBookarkInput from 'components/NewBookmarkInput'
import LibrarianAppBar from 'components/AppBar'
import CreateBookmarkDialog from 'components/CreateBookmarkDialog'

describe('AppBar', () => {
  const createBookmark = component => {
    const bookmark = BookmarkFactory.build()
    component.find(NewBookarkInput).prop('onNewBookmark')(bookmark)
    return bookmark
  }

  describe('NewBookmarkInput', () => {
    it('displays create  dialog on new bookmark', () => {
      const component = shallow(<LibrarianAppBar />)

      createBookmark(component)

      expect(component.find(CreateBookmarkDialog)).toExist()
    })
  })

  describe('CreateBookmarkDialog', () => {
    it('closes dialog on save', () => {
      const component = shallow(<LibrarianAppBar />)

      createBookmark(component)
      component.find(CreateBookmarkDialog).prop('onSave')()

      expect(component.find(CreateBookmarkDialog)).not.toExist()
    })

    it('closes dialog on cancel', () => {
      const component = shallow(<LibrarianAppBar />)

      createBookmark(component)
      component.find(CreateBookmarkDialog).prop('onCancel')()

      expect(component.find(CreateBookmarkDialog)).not.toExist()
    })
  })
})
