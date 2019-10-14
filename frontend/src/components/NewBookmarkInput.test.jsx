import * as React from 'react'
import { useGetMetadata } from 'hooks'
import { BookmarkFactory } from 'factories/BookmarkFactory'
import { shallow } from 'enzyme'
import NewBookarkInput from 'components/NewBookmarkInput'
import Input from 'react-toolbox/lib/input'
import { act } from 'react-dom/test-utils'

jest.mock('hooks')

describe('NewBookmarkInput', () => {
  const mockGetMetadata = bookmark => {
    const get = jest.fn()
    useGetMetadata.mockReturnValue([bookmark, get])
    return get
  }

  it('calls onNewBookmark if metadata and clears url', () => {
    mockGetMetadata()
    const spy = jest.fn()
    const component = mount(<NewBookarkInput onNewBookmark={spy} />)

    mockGetMetadata(BookmarkFactory.build())
    act(() => component.find(Input).prop('onChange')('url'))
    component.update()

    expect(component.find(Input)).toHaveProp({ value: '' })
    expect(spy).toBeCalledTimes(1)
  })

  it('calls getMetadata with url on enter', () => {
    const url = 'url'
    const getMetadata = mockGetMetadata()
    const spy = jest.fn()
    const component = shallow(<NewBookarkInput onNewBookmark={spy} />)

    component.find(Input).prop('onChange')(url)
    component.find(Input).prop('onKeyPress')({ key: 'Enter' })

    expect(getMetadata).toBeCalledWith(url)
  })
})
