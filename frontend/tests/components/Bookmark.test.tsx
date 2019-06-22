import * as React from 'react'
import Bookmark from 'components/Bookmark'
import { shallow } from 'enzyme'
import { BookmarkFactory } from '../factories/BookmarkFactory'
import { IBookmark } from 'interfaces'
import { CardTitle, CardMedia, CardText } from 'react-toolbox/lib/card'

describe('Bookmark', () => {
  it('displays bookmark information', () => {
    const bookmark = BookmarkFactory.build() as IBookmark
    const component = shallow(<Bookmark bookmark={bookmark} />)

    expect(component.find(CardTitle)).toHaveProp({ title: bookmark.title })
    expect(component.find(CardMedia)).toHaveProp({ image: bookmark.img })
    expect(component.find(CardText).childAt(0)).toHaveText(bookmark.description)
  })
})
