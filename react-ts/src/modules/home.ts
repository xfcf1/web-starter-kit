import { createAction, createReducer } from 'redux-act'

export const setName: any = createAction('修改名称')

const initialState = {
  name: ''
}

export default createReducer(
  {
    [setName]: (state: {}, data: string) => {
      return { ...state, name: data }
    }
  },
  initialState
)
