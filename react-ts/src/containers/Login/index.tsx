import Login from './page'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../modules/login'
import { IRootState } from '../../modules/state'

const mapState = (state: IRootState) => ({
  homeReducer: state.homeReducer
})

const mapDispatch = (dispatch: Dispatch) => bindActionCreators(actions, dispatch)

export default connect(mapState, mapDispatch)(Login as any)
