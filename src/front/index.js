import React from 'react'
import {render} from 'react-dom'

import store from './store'
import {linkHistoryToStore} from './routing'

import getStatus from './store/actions/getStatus'
import performScan from './store/actions/performScan'

import Root from './components/Root'

linkHistoryToStore(store)

getStatus(store.dispatch)
performScan(store.dispatch)

render(<Root store={store} />, document.getElementById('app'))
