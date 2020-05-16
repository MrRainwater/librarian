import React from 'react'
import BookmarkFactory from 'factories/BookmarkFactory'
import { shallow } from 'enzyme'
import CreateBookmarkDialog from './CreateBookmarkDialog'
import { createBookmark } from 'api'
import { useBookmarks } from 'hooks'
import { Button, TextField } from '@material-ui/core'

jest.mock('api')
jest.mock('hooks')

describe('CreateBookmarkDialog', () => {
  const metadata = BookmarkFactory.build({ img: 'image' })
  const onCancel = jest.fn()
  const onSave = jest.fn()
  const defaultProps = { metadata, onCancel, onSave }

  const event = (value) => ({ target: { value } })

  const findInput = (component, label) =>
    component
      .find(TextField)
      .findWhere((input) => input.prop('label') === label)

  const setInputs = (component, { title, description, url, img }) => {
    title && findInput(component, 'title').prop('onChange')(event(title))
    description &&
      findInput(component, 'description').prop('onChange')(event(description))
    url && findInput(component, 'url').prop('onChange')(event(url))
    img && findInput(component, 'img').prop('onChange')(event(img))
  }

  const expectInputs = (component, { title, description, url, img }) => {
    title && expect(findInput(component, 'title')).toHaveProp({ value: title })
    description &&
      expect(findInput(component, 'description')).toHaveProp({
        value: description
      })
    url && expect(findInput(component, 'url')).toHaveProp({ value: url })
    img && expect(findInput(component, 'img')).toHaveProp({ value: img })
  }

  const getOnCancel = (component) => {
    return component
      .find(Button)
      .first()
      .prop('onClick')
  }

  const getOnSave = (component) => {
    return component
      .find(Button)
      .last()
      .prop('onClick')
  }

  beforeEach(() => {
    useBookmarks.mockReturnValue([])
  })

  describe('Click save button', () => {
    let bookmarks, setBookmarks

    beforeEach(() => {
      bookmarks = [BookmarkFactory.build(), BookmarkFactory.build()]
      setBookmarks = jest.fn()
      useBookmarks.mockReturnValue([bookmarks, setBookmarks])
    })

    it('calls api createBookmark', () => {
      const component = shallow(<CreateBookmarkDialog {...defaultProps} />)

      getOnSave(component)()

      expect(createBookmark).toBeCalledWith(metadata)
    })

    it('adds bookmark to state', () => {
      const component = shallow(<CreateBookmarkDialog {...defaultProps} />)

      getOnSave(component)()

      expect(setBookmarks).toBeCalledWith([...bookmarks, metadata])
    })

    it('calls onSave prop', () => {
      const component = shallow(<CreateBookmarkDialog {...defaultProps} />)

      getOnSave(component)()

      expect(onSave).toBeCalledWith(metadata)
    })
  })

  it('calls onCancel when cancel clicked', () => {
    const component = shallow(<CreateBookmarkDialog {...defaultProps} />)

    getOnCancel(component)()

    expect(onCancel).toBeCalled()
  })

  describe('Inputs', () => {
    it('initialized with metadata', () => {
      const component = shallow(<CreateBookmarkDialog {...defaultProps} />)

      expectInputs(component, metadata)
    })

    it('updates input values', () => {
      const bookmark = {
        title: 'new title',
        description: 'new description',
        url: 'new url',
        img: 'new image'
      }
      const component = shallow(<CreateBookmarkDialog {...defaultProps} />)

      setInputs(component, bookmark)

      expectInputs(component, bookmark)
    })
  })
})
