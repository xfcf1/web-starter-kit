import { createAction, createReducer } from 'redux-act'
export { setAuth } from './login'

export const setName: any = createAction('修改名称')

const initialState = {
  name: 'aaa'
}

export default createReducer(
  {
    [setName]: (state: {}, data: string) => {
      return { ...state, name: data }
    }
  },
  initialState
)
