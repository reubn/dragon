import {combineReducers} from 'redux'

import {routerReducer} from 'react-router-redux'

import status from './status'
import scan from './scan'
import passwordPrompt from './passwordPrompt'

const reducers = {
  routing: routerReducer,
  status,
  scan,
  passwordPrompt
}

export default combineReducers(reducers)
