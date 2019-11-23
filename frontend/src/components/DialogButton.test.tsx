import DialogButton from 'components/DialogButton'
import { shallow, ShallowWrapper } from 'enzyme'
import * as React from 'react'
import Button from 'react-toolbox/lib/button'
import Dialog from 'react-toolbox/lib/dialog'

const defaultProps = {
  title: 'title'
}

describe('Dialog Button', () => {
  const getOnClick = (component: ShallowWrapper) =>
    component.find(Button).prop('onClick')!

  it('clicking toggles dialog active', () => {
    const component = shallow(<DialogButton {...defaultProps} />)

    const onClick = getOnClick(component)

    expect(component.find(Dialog)).toHaveProp({ active: false })

    onClick()
    expect(component.find(Dialog)).toHaveProp({ active: true })

    onClick()
    expect(component.find(Dialog)).toHaveProp({ active: false })
  })

  it('passes children to dialog', () => {
    const child = <span id="child">child</span>
    const component = shallow(
      <DialogButton {...defaultProps}>{child}</DialogButton>
    )

    const onClick = getOnClick(component)
    onClick()

    expect(component.find(Dialog).children()).toContainMatchingElement('#child')
  })
})
