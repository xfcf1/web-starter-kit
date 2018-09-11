import { createAction, createReducer } from 'redux-act'
export { setAuth } from './login'

export const setName: any = createAction('修改名称')

export interface IHomeReducer {
  name: string
}

const initialState: IHomeReducer = {
  name: ''
}

export default createReducer<IHomeReducer>(
  {
    [setName]: (state, data) => {
      return { ...state, name: data }
    }
  },
  initialState
)
