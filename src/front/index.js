import React from 'react'
import {render} from 'react-dom'

import store from './store'
import {linkHistoryToStore} from './routing'

import Root from './components/Root'

linkHistoryToStore(store)

render(<Root store={store} />, document.getElementById('app'))
