import * as React from 'react'
import Bookmark from 'components/Bookmarks/Bookmark'
import { shallow } from 'enzyme'
import { BookmarkFactory } from '../../../src/factories/BookmarkFactory'
import { IBookmark } from 'interfaces'
import { CardTitle, CardMedia, CardText } from 'react-toolbox/lib/card'
import { IconButton } from 'react-toolbox/lib/button'

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

    const findIconButton = (icon: string) =>
      component
        .find(IconButton)
        .findWhere(button => button.prop('icon') === icon)

    expect(findIconButton('link')).toExist()
    expect(findIconButton('edit')).toExist()
    expect(findIconButton('label')).toExist() //label icon represents tags
    expect(findIconButton('folder')).toExist()
  })
})
