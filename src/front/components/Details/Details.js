import React from 'react'

import {details, ssid as ssidStyle, mac, ip} from './style'

const Header = ({ssid, address, ip_address}) => (
  <section className={details}>
    <p className={ssidStyle}>{ssid}</p>
    <p className={mac}>{address}</p>
    <p className={ip}>{ip_address}</p>
  </section>
)

export default Header
