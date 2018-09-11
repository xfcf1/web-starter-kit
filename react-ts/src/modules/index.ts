import { combineReducers } from 'redux'
import homeReducer from './home'
import loginReducer from './login'
import { IRootState } from './state'

export default combineReducers<IRootState>({
  homeReducer: homeReducer as any,
  loginReducer: loginReducer as any
})
