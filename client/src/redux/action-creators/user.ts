import { Dispatch } from 'redux'
import { UserAction, UserActionTypes } from '../../types/user'

export const setIsAuth = (data: any, isAuth: boolean) => (dispatch: Dispatch<UserAction>) => {
  dispatch({ type: UserActionTypes.SET_IS_AUTH, payload: { data, isAuth } })
}
