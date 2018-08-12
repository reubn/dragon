export default async dispatch => {
  const res = await fetch('wifi/SSIDs')
  const json = await res.json()

  dispatch({type: 'KNOWN_SSIDS', payload: json})
}
