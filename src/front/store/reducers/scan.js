import inital from '../initials/scan'

export default (state=inital, action) => {
  if(action.type === 'SCAN_RESULTS') return action.payload

  return state
}
