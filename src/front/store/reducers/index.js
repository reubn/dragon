import {combineReducers} from 'redux'

import {routerReducer} from 'react-router-redux'

import about from './about'

const reducers = {
  routing: routerReducer,
  about
}

export default combineReducers(reducers)
