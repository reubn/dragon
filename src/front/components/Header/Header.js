import React from 'react'
import classnames from 'classnames'

import {header, connected, unknown, switching} from './style'

const stateClasses = {
  connected, unknown, switching
}

const Header = ({state}) => (
  <header className={classnames(header, stateClasses[state] || unknown)}>
    {state}
  </header>
)

export default Header
