import {connect} from 'react-redux'

// import updateStatusAction from '../../store/actions/updateStatus'

import Header from './Header'

const mapStateToProps = ({status: {state}}) => ({state})

export default connect(mapStateToProps)(Header)
