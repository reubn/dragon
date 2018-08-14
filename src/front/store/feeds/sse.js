export default ({dispatch}) => {
  let source, retryTimeout;

  const initiate = () => {
    if(source) source.close()
    source = new EventSource('/wifi/events')

    source.onmessage = event => {
      if(retryTimeout) clearTimeout(retryTimeout)
      if(/iPad|iPhone|iPod/.test(navigator.userAgent)) retryTimeout = setTimeout(initiate, 7 * 1000)

      const {event: eventType, data} = JSON.parse(event.data)
      console.log({eventType, data})

      if(eventType === 'status') return dispatch({type: 'STATUS_UPDATE', payload: data})
      if(eventType === 'scan') return dispatch({type: 'SCAN_RESULTS', payload: data})
    }
  }

  initiate()
}
