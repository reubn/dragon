import getKnownSSIDs from './getKnownSSIDs'

export default async (dispatch, {SSID, password, id}) => {
  dispatch({type: 'CONNECTION_REQUESTED'})
  
  return fetch('wifi/connect', {
    method: 'POST',
    body: JSON.stringify({SSID, password, id}),
    headers:{
      'Content-Type': 'application/json'
    }
  })
}
