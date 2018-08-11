import React from 'react'

import Header from '../Header'
import Details from '../Details'

import {app} from './style'

const App = () => (
  <section className={app}>
    <Header />
    <Details />
  </section>
)

export default App
