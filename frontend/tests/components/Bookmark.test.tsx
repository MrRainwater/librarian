import * as React from 'react'
import Bookmark from 'components/Bookmark'
import { shallow } from 'enzyme'
import { BookmarkFactory } from '../factories/BookmarkFactory'
import { IBookmark } from 'interfaces'
import { CardTitle, CardMedia, CardText } from 'react-toolbox/lib/card'
import { withBookmarksStore } from 'stores/BookmarkStore'

describe('Bookmark', () => {
  let bookmark: IBookmark

  beforeEach(() => {
    bookmark = BookmarkFactory.build({
      numFolders: 1,
      numTags: 1
    }) as IBookmark
  })
  it('displays bookmark information', () => {
    const component = shallow(<Bookmark bookmark={bookmark} />)

    expect(component.find(CardTitle)).toHaveProp({ title: bookmark.title })
    expect(component.find(CardMedia)).toHaveProp({ image: bookmark.img })
    expect(component.find(CardText).childAt(0)).toHaveText(bookmark.description)
    expect(component.find('BookmarkTags')).toHaveProp({ tags: bookmark.tags })
  })

  describe('Actions', () => {
    it('displays button for each action item', () => {
      const component = shallow(<Bookmark bookmark={bookmark} />)

      expect(component.find('EditBookmark')).toHaveProp({ bookmark })
      expect(component.find('BookmarkLink')).toHaveProp({ href: bookmark.url })
      expect(component.find('EditTags')).toHaveProp({ tags: bookmark.tags })
      expect(component.find('EditFolders')).toHaveProp({
        folders: bookmark.folders
      })
    })

    describe('tags', () => {
      it('adding', () => {
        const tag = 'new tag'
        const component = shallow(<Bookmark bookmark={bookmark} />)

        // component.find('EditTags').prop('onAddTag')(tag)

        expect(bookmark.tags).toContain(tag)
      })

      it('removing', () => {
        const [tag] = bookmark.tags
        const component = shallow(<Bookmark bookmark={bookmark} />)

        // component.find('EditTags').prop('onRemoveTag')(tag)

        expect(bookmark.tags.includes(tag)).toBeFalsy()
      })
    })

    describe('folders', () => {
      it('copy to folder', () => {
        //need to setup folder objects
        const folder = 'new folder'
        const component = shallow(<Bookmark bookmark={bookmark} />)

        // component.find('EditBookmarks').prop('onCopyToFolder')(folder)

        expect(bookmark.folders).toContain(folder)
      })

      it('move to folder', () => {
        //need to setup folder objects
        const folder = 'new folder'
        const component = shallow(<Bookmark bookmark={bookmark} />)

        // component.find('EditBookmarks').prop('onMoveToFolder')(folder)

        expect(bookmark.folders).toContain(folder)
      })

      it('remove from folder', () => {
        //need to setup folder objects
        const folder = 'new folder'
        const component = shallow(<Bookmark bookmark={bookmark} />)

        // component.find('EditBookmarks').prop('onCopyToFolder')(folder)

        expect(bookmark.folders).toContain(folder)
      })
    })
  })
})
