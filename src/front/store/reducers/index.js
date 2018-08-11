import {combineReducers} from 'redux'

import {routerReducer} from 'react-router-redux'

import status from './status'

const reducers = {
  routing: routerReducer,
  status
}

export default combineReducers(reducers)
