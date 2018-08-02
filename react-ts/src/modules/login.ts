import { createAction, createReducer } from 'redux-act'

export const setAuth: any = createAction('修改登录状态')

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
