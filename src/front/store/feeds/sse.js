export default ({dispatch}) => {
  const source = new EventSource('/wifi/events')

  source.onmessage = event => {
    const {event: eventType, data} = JSON.parse(event.data)
    console.log({eventType, data})

    if(eventType === 'status') return dispatch({type: 'STATUS_UPDATE', payload: data})
  }
}
