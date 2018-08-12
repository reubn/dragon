import getKnownSSIDs from './getKnownSSIDs'

export default async (dispatch, {SSID, password, id}) => {
  const res = await fetch('wifi/connect', {
    method: 'POST',
    body: JSON.stringify({SSID, password, id}),
    headers:{
      'Content-Type': 'application/json'
    }
  })
  const json = await res.json()

  dispatch({type: 'CONNECTION_REQUESTED', payload: json})
}
