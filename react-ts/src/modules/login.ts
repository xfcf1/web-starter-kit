import { createAction, createReducer } from 'redux-act'
import { Dispatch } from 'redux'
import { message } from 'antd'
import { History } from 'history'
import { RootState } from './state'
import { setName } from './home'

export const setAuth: any = createAction('修改登录状态')

export function login({ username, password }: { username: string, password: string }, history: History) {
  return (dispatch: Dispatch) => {
    if (username === 'alex' && password === '123') {
      dispatch(setAuth(true))
      history.push('/')
      dispatch(setName(username))
    } else {
      dispatch(setAuth(false))
      message.warning('用户名或密码错误')
    }
  }
}

export interface ILoginReducer {
  isAuth: boolean
}

const initialState: RootState.loginReducer = {
  isAuth: false
}

export default createReducer(
  {
    [setAuth]: (state: {}, data: boolean) => {
      return { ...state, isAuth: data }
    }
  },
  initialState
)
