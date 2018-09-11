import { IHomeReducer } from './home'
import { ILoginReducer } from './login'

export interface IRootState {
  homeReducer: IHomeReducer,
  loginReducer: ILoginReducer
}

export namespace RootState {
  export type homeReducer = IHomeReducer
  export type loginReducer = ILoginReducer
}
