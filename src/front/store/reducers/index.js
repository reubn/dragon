import {combineReducers} from 'redux'

import {routerReducer} from 'react-router-redux'

import status from './status'
import scan from './scan'

const reducers = {
  routing: routerReducer,
  status,
  scan
}

export default combineReducers(reducers)
