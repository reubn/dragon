import React from 'react'

import Header from '../Header'
import Details from '../Details'
import ScanResults from '../ScanResults'
import PasswordPrompt from '../PasswordPrompt'

import {app} from './style'

const App = () => (
  <section className={app}>
    <Header />
    <Details />
    <ScanResults />
    <PasswordPrompt />
  </section>
)

export default App
