import React from 'react'

import SSIDRow from './SSIDRow'

import {scanResults} from './style'

const ScanResults = ({scan}) => (
  <section className={scanResults}>
    {scan.map(({SSID, ...other}) => <SSIDRow key={SSID} SSID={SSID} {...other} />)}
  </section>
)

export default ScanResults
