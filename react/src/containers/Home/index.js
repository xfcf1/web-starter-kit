import Home from './page'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../moudles/home'

const mapState = state => ({
  homeReducer: state.homeReducer
})

const mapDispatch = dispatch => bindActionCreators(actions, dispatch)

export default connect(mapState, mapDispatch)(Home)
