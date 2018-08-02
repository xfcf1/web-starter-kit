import Login from './page'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../modules/login'

const mapState = (state: any) => ({
  homeReducer: state.homeReducer
})

const mapDispatch = (dispatch: any) => bindActionCreators(actions, dispatch)

export default connect(mapState, mapDispatch)(Login)
