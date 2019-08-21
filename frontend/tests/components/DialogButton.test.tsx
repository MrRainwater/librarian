import * as React from 'react'
import DialogButton from 'components/DialogButton'
import Button from 'react-toolbox/lib/button'
import Dialog from 'react-toolbox/lib/dialog'
import { shallow, ShallowWrapper } from 'enzyme'

const Child = () => <div>Hello</div>
const defaultProps = {
  title: 'title'
}

describe('Dialog Button', () => {
  it('clicking toggles dialog active', () => {
    const component = shallow(<DialogButton {...defaultProps} />)

    const onClick = component.find(Button).prop('onClick')!

    expect(component.find(Dialog)).toHaveProp({ active: false })

    onClick()
    expect(component.find(Dialog)).toHaveProp({ active: true })

    onClick()
    expect(component.find(Dialog)).toHaveProp({ active: false })
  })
  it('passes children to dialog')
})
