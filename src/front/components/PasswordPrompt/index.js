import {connect} from 'react-redux'

// import updateStatusAction from '../../store/actions/updateStatus'

import PasswordPrompt from './PasswordPrompt'

const mapStateToProps = ({passwordPrompt: {SSID, callToConnect, open}}) => ({SSID, callToConnect, open})

export default connect(mapStateToProps)(PasswordPrompt)
