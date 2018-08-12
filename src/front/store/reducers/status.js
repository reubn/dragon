import inital from '../initials/status'

export default (state=inital, action) => {
  if(action.type === 'STATUS_UPDATE') return action.payload
  if(action.type === 'CONNECTION_REQUESTED') return {...state, state: 'switching'}

  return state
}
