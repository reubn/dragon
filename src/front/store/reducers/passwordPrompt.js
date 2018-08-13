import inital from '../initials/scan'

export default (state=inital, action) => {
  if(action.type === 'SHOW_PASSWORD_PROMPT') return {
    open: true,
    ...action.payload
  }

  if(action.type === 'HIDE_PASSWORD_PROMPT') return inital

  return state
}
