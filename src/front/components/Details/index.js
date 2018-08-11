import {connect} from 'react-redux'

// import updateStatusAction from '../../store/actions/updateStatus'

import Details from './Details'

const mapStateToProps = ({status: {ssid, address, ip_address}}) => ({ssid, address, ip_address})

export default connect(mapStateToProps)(Details)
