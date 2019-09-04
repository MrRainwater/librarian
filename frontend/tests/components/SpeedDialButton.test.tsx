import * as React from 'react'
import SpeedDialButton from 'components/SpeedDialButton'
import { shallow } from 'enzyme'
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
})
