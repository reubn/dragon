export default ({dispatch}) => {
  const source = new EventSource('/wifi/events')

  source.onmessage = event => {
    const {eventType, data} = JSON.parse(event.data)

    if(eventType === 'status') return dispatch({type: 'STATUS_UPDATE', data})
    console.warning('Unhandled Event', {eventType, data})
  }
}
