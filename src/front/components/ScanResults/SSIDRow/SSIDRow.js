import React from 'react'
import classnames from 'classnames'

import SignalStrength from '../../SignalStrength'

import {row, title, signalStrength, secure as secureStyle, iconGroup} from './style'

const SSIDRow = ({SSID, secure, signal}) => (
  <section className={row}>
    <span className={title}>{SSID}</span>
    <span className={iconGroup}>
      <SignalStrength className={signalStrength} signal={signal} />
      {/*<Secure className={secureStyle} secure={secure} />*/}
    </span>
  </section>
)

export default SSIDRow
