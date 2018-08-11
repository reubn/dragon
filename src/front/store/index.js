import {createStore} from 'redux'

import reducers from './reducers'
import initials from './initials'
import middleware from './middleware'
import feeds from './feeds'

const store = createStore(reducers, initials, middleware)
feeds(store)

export default store
