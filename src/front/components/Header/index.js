import {connect} from 'react-redux'

// import updateStatusAction from '../../store/actions/updateStatus'

import Header from './Header'

const mapStateToProps = ({status: {state}}) => ({state})
const mapDispatchToProps = null /* {
  selectElement: atomicNumber => dispatch => selectElementAction(dispatch, atomicNumber, false),
  close: () => dispatch => selectElementAction(dispatch, null)
} */

export default connect(mapStateToProps, mapDispatchToProps)(Header)
