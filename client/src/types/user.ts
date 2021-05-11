export interface UserState {
  user: any
  isAuth: boolean
  isFetch: boolean
}

export enum UserActionTypes {
  SET_IS_AUTH = 'SET_IS_AUTH',
  UPDATE_AVATAR_FETCH = 'UPDATE_AVATAR_FETCH',
  UPDATE_AVATAR_SUCCESS = 'UPDATE_AVATAR_SUCCESS',
}

interface SetIsAuthAction {
  type: UserActionTypes.SET_IS_AUTH
  payload: { data: any; isAuth: boolean }
}

interface UpdateAvatarFetchAction {
  type: UserActionTypes.UPDATE_AVATAR_FETCH
}

interface UpdateAvatarSuccessAction {
  type: UserActionTypes.UPDATE_AVATAR_SUCCESS
  avatar: string
}

export type UserAction = SetIsAuthAction | UpdateAvatarFetchAction | UpdateAvatarSuccessAction
