import React from 'react'

import SignalStrength from '../SignalStrength'

import {details, ssid as ssidStyle, mac, ip, signalStrength} from './style'

const Details = ({ssid, address, ip_address, signal}) => (
  <section className={details}>
    <p className={ssidStyle}>{ssid}</p>
    <p className={mac}>{address}</p>
    <p className={ip}>{ip_address}</p>
    <SignalStrength className={signalStrength} signal={signal} />
  </section>
)

export default Details
