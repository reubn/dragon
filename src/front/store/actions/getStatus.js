export default async dispatch => {
  const res = await fetch('wifi/status')
  const json = await res.json()

  dispatch({type: 'STATUS_UPDATE', payload: json})
}
