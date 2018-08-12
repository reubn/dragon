import {connect} from 'react-redux'

import ScanResults from './ScanResults'

const mapStateToProps = ({scan}) => ({scan})

export default connect(mapStateToProps)(ScanResults)
