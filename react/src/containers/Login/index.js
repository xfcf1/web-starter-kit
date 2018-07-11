import Page from './page'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../moudles/login'

const mapState = state => ({
  loginReducer: state.loginReducer
})

const mapDispatch = dispatch => bindActionCreators(actions, dispatch)

export default connect(
  mapState,
  mapDispatch
)(Page)
