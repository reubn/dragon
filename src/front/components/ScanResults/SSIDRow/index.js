import {connect} from 'react-redux'

import connectToNetworkAction from '../../../store/actions/connectToNetwork'
import requestPasswordAction from '../../../store/actions/requestPassword'

import SSIDRow from './SSIDRow'

const mapStateToProps = null
const mapDispatchToProps = dispatch => ({
  connectUnbound: ({SSID, password, id}) => connectToNetworkAction(dispatch, {SSID, password, id}),
  requestPasswordUnbound: ({SSID, callToConnect}) => requestPasswordAction(dispatch, {SSID, callToConnect})
})
const mergeProps = (stateProps, {connectUnbound, requestPasswordUnbound}, {SSID, known, networks}) => {
  const secure = !!networks.find(({security}) => security !== 'open')
  const signal = Math.max(...networks.map(({signal}) => signal))
  const flags = known ? known.flags : null

  // const connect = () => known ? connectUnbound({id: known.id}) :

  const connect = () => do {
    if(known) connectUnbound({SSID, id: known.id}) // Known SSID
    else if(!secure) connectUnbound({SSID}) // Unknown but Open
    else requestPasswordUnbound({SSID, callToConnect: password => connectUnbound({SSID, password})}) // Unknown and Secure
  }

  return {
    SSID,
    secure,
    signal,
    flags,
    connect
  }

}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SSIDRow)
