import { createAction, createReducer } from 'redux-act'
import { Message } from 'antd'
import fetch from '../tools/fetch'
import API from '../tools/constants'

export const setAuth = createAction('修改登录状态')

export function login({ username, password }, history) {
  return async (dispatch, getState) => {
    const isAuth = await fetch(API.LOGIN, { username, password })
    if (isAuth.code === 0) {
      dispatch(setAuth(true))
      history.push('/')
    } else {
      Message.error('登录失败')
    }
  }
}

const initialState = {
  isAuth: false
}

export default createReducer(
  {
    [setAuth]: (state, data) => {
      return { ...state, isAuth: data }
    }
  },
  initialState
)
