import Home from './page'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../modules/home'
import { IRootState } from '../../modules/state'

const mapState = (state: IRootState) => ({
  homeReducer: state.homeReducer,
  loginReducer: state.loginReducer
})

const mapDispatch = (dispatch: Dispatch) => bindActionCreators(actions, dispatch)

export default connect(mapState, mapDispatch)(Home)
