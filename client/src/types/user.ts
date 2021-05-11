export interface UserState {
  user: any
  isAuth: boolean
}

export enum UserActionTypes {
  SET_IS_AUTH = 'SET_IS_AUTH',
}

interface SetIsAuthAction {
  type: UserActionTypes.SET_IS_AUTH
  payload: { data: any; isAuth: boolean }
}

export type UserAction = SetIsAuthAction
