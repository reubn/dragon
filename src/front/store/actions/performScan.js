export default async dispatch => {
  const res = await fetch('wifi/scan')
  const json = await res.json()

  dispatch({type: 'SCAN_RESULTS', payload: json})
}
