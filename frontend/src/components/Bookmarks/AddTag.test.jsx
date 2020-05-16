import React from 'react'
import { shallow } from 'enzyme'
import AddTag from './AddTag'
import { Button, IconButton } from '@material-ui/core'

describe('AddTag', () => {
  it('calls onAddTag with inputed tag', () => {
    const onAddTag = jest.fn()
    const tag = 'tag'
    const component = shallow(<AddTag onAddTag={onAddTag} />)

    component.find(IconButton).prop('onClick')()
    component.find('input').prop('onChange')({ target: { value: tag } })
    component
      .find(Button)
      .last()
      .prop('onClick')()

    expect(onAddTag).toBeCalledWith(tag)
  })
})
