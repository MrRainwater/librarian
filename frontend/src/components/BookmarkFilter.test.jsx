import { shallow, mount } from 'enzyme'
import BookmarkFilter from './BookmarkFilter'
import BookmarkFactory from 'factories/BookmarkFactory'
import { act } from 'react-dom/test-utils'
import { TextField } from '@material-ui/core'
describe('BookmarkFilter', () => {
  const bookmarks = [
    BookmarkFactory.build({ title: 'ABC' }),
    BookmarkFactory.build({ title: 'XYZ' })
  ]
  const onResults = jest.fn()
  const defaultProps = { bookmarks, onResults }

  it('calls onResults with filtered bookmarks', () => {
    const component = mount(<BookmarkFilter {...defaultProps} />)

    act(() =>
      component.find(TextField).prop('onChange')({
        target: { value: bookmarks[0].title }
      })
    )

    expect(onResults).toBeCalledWith([bookmarks[0]])
  })
})
