import { createAction, handleActions } from 'redux-actions'
export { setAuth } from './login'

export const setName = createAction('修改名称')

export interface IHomeReducer {
  name: string
}

const initialState: IHomeReducer = {
  name: ''
}

export default handleActions<IHomeReducer, any>(
  {
    [setName.toString()]: (state, data) => {
      return { ...state, name: data.payload }
    }
  },
  initialState
)
