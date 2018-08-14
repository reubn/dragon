import React from 'react'
import classnames from 'classnames'

import SignalStrength from '../../SignalStrength'
import SecureIndicator from '../../SecureIndicator'
import FlagsIndicator from '../../FlagsIndicator'

import {row, title, signalStrength, secure as secureStyle, flags as flagsStyle, iconGroup} from './style'

const SSIDRow = ({SSID, secure, signal, flags, connect}) => (
  <section className={row} onClick={connect}>
    <span className={title}>{SSID}</span>
    <span className={iconGroup}>
      <FlagsIndicator className={flagsStyle} flags={flags} />
      <SecureIndicator className={secureStyle} secure={secure} />
      <SignalStrength className={signalStrength} signal={signal} />
    </span>
  </section>
)

export default SSIDRow
