import { createAction, createReducer } from 'redux-act'

export const modifyName = createAction('修改姓名')

export function getName() {
  return async (dispatch, getState) => {
    const name = await setName()
    dispatch(modifyName(name))
  }
}
function setName() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Async Alex')
    }, 2000)
  })
}

const initialState = {
  name: 'Alex'
}

export default createReducer(
  {
    [modifyName]: (state, data) => {
      return { ...state, name: data }
    }
  },
  initialState
)
