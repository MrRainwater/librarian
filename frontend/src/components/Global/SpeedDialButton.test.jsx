import { Fab } from '@material-ui/core'
import SpeedDialButton from 'components/Global/SpeedDialButton'
import { shallow } from 'enzyme'
import * as React from 'react'

describe('SpeedDialButton', () => {
  it('toggles list of buttons on click', () => {
    const component = shallow(<SpeedDialButton />)

    const onClick = component.find(Fab).prop('onClick')

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

    component.find(Fab).prop('onClick')()

    expect(component.find('div.button-list').find(Child)).toExist()
  })
})
