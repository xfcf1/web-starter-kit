import { createAction, createReducer } from 'redux-act'
import { message } from 'antd'
import { setName } from '../modules/home'

export const setAuth: any = createAction('修改登录状态')

export function login({ username, password }: { username: string, password: string }, history: any) {
  return (dispatch: any) => {
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

const initialState = {
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
