import * as React from 'react'
import Bookmark from 'components/Bookmarks/Bookmark'
import Tags from 'components/Bookmarks/BookmarkTags'
import { shallow } from 'enzyme'
import { BookmarkFactory } from '../factories/BookmarkFactory'
import { IBookmark } from 'interfaces'
import { CardTitle, CardMedia, CardText } from 'react-toolbox/lib/card'
import { withBookmarksStore } from 'stores/BookmarkStore'
import Button from 'react-toolbox/lib/button'

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
  })

  it('displays button for each action item', () => {
    const component = shallow(<Bookmark bookmark={bookmark} />)

    const findButton = (text: string) =>
      component.find(Button).findWhere(button => button.text() === text)

    expect(findButton('Edit')).toExist()
    expect(findButton('Link')).toExist()
    expect(findButton('Tags')).toExist()
    expect(findButton('Folders')).toExist()
  })
})
