import SpeedDialButton from 'components/SpeedDialButton'
import { shallow } from 'enzyme'
import * as React from 'react'
import Button from 'react-toolbox/lib/button'

describe('SpeedDialButton', () => {
  it('toggles list of buttons on click', () => {
    const component = shallow(<SpeedDialButton />)

    const onClick = component.find(Button).prop('onClick')!

    expect(component.find('div.button-list')).not.toExist()

    onClick()
    expect(component.find('div.button-list')).toExist()

    onClick()
    expect(component.find('div.button-list')).not.toExist()
  })

  it('renders children onClick', () => {
    const Child = () => <h1>Hello</h1>
    const component = shallow(
      <SpeedDialButton>
        <Child />
      </SpeedDialButton>
    )

    component.find(Button).prop('onClick')!()

    expect(component.find('div.button-list').find(Child)).toExist()
  })
})
