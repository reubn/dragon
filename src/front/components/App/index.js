import React from 'react'

import Header from '../Header'
import Details from '../Details'
import ScanResults from '../ScanResults'

import {app} from './style'

const App = () => (
  <section className={app}>
    <Header />
    <Details />
    <ScanResults />
  </section>
)

export default App
