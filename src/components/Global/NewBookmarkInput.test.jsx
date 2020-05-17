import * as React from 'react'
import { useGetMetadata } from 'hooks'
import { BookmarkFactory } from 'factories/BookmarkFactory'
import { shallow, mount } from 'enzyme'
import NewBookarkInput from 'components/Global/NewBookmarkInput'
import TextField from '@material-ui/core/TextField'
import { act } from 'react-dom/test-utils'

jest.mock('hooks')

describe('NewBookmarkInput', () => {
  const mockGetMetadata = (bookmark) => {
    const get = jest.fn()
    useGetMetadata.mockReturnValue([bookmark, get])
    return get
  }

  const event = (value) => ({ target: { value } })

  it('calls onNewBookmark if metadata and clears url', () => {
    mockGetMetadata()
    const spy = jest.fn()
    const component = mount(<NewBookarkInput onNewBookmark={spy} />)

    mockGetMetadata(BookmarkFactory.build())
    act(() => component.find(TextField).prop('onChange')(event('url')))
    component.update()

    expect(component.find(TextField)).toHaveProp({ value: '' })
    expect(spy).toBeCalledTimes(1)
  })

  it('calls getMetadata with url on enter', () => {
    const url = 'url'
    const getMetadata = mockGetMetadata()
    const spy = jest.fn()
    const component = shallow(<NewBookarkInput onNewBookmark={spy} />)

    component.find(TextField).prop('onChange')(event('url'))
    component.find(TextField).prop('onKeyDown')({ key: 'Enter' })

    expect(getMetadata).toBeCalledWith(url)
  })
})
