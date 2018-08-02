import Home from './page'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../modules/home'

const mapState = (state: any) => ({
  homeReducer: state.homeReducer,
  loginReducer: state.loginReducer
})

const mapDispatch = (dispatch: any) => bindActionCreators(actions, dispatch)

export default connect(mapState, mapDispatch)(Home)
