import { shallow, mount } from 'enzyme'
import BookmarkFilter from './BookmarkFilter'
import BookmarkFactory from 'factories/BookmarkFactory'
import Input from 'react-toolbox/lib/input'
import { act } from 'react-dom/test-utils'
describe('BookmarkFilter', () => {
  const bookmarks = [
    BookmarkFactory.build({ title: 'ABC' }),
    BookmarkFactory.build({ title: 'XYZ' })
  ]
  const onResults = jest.fn()
  const defaultProps = { bookmarks, onResults }

  it('calls onResults with filtered bookmarks', () => {
    const component = mount(<BookmarkFilter {...defaultProps} />)

    act(() => component.find(Input).prop('onChange')(bookmarks[0].title))

    expect(onResults).toBeCalledWith([bookmarks[0]])
  })
})
