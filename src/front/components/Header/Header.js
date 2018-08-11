import React from 'react'
import classnames from 'classnames'

import {header, connected, unknown} from './style'

const stateClasses = {
  connected, unknown
}

const Header = ({state}) => (
  <header className={classnames(header, stateClasses[state] || unknown)}>
    {state}
  </header>
)

export default Header
