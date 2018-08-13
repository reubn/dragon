export default (dispatch, {SSID, callToConnect}) => dispatch({
  type: 'SHOW_PASSWORD_PROMPT',
  payload: {
    SSID,
    callToConnect: (...args) => {
      dispatch({type: 'HIDE_PASSWORD_PROMPT'})
      callToConnect(...args)
    }
  }
})
