import { createAction, handleActions } from 'redux-actions'
import { Dispatch } from 'redux'
import { message } from 'antd'
import { History } from 'history'
import { setName } from './home'

export const setAuth = createAction('修改登录状态')

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

const initialState: ILoginReducer = {
  isAuth: false
}

export default handleActions<ILoginReducer, any>(
  {
    [setAuth.toString()]: (state, data) => {
      return { ...state, isAuth: data.payload }
    }
  },
  initialState
)
