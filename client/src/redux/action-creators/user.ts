import { Dispatch } from 'redux'
import { UserAction, UserActionTypes } from '../../types/user'
import { updateAvatar } from '../../api/userAPI'

export const setIsAuth = (data: any, isAuth: boolean) => (dispatch: Dispatch<UserAction>) => {
  dispatch({ type: UserActionTypes.SET_IS_AUTH, payload: { data, isAuth } })
}

export const updateAvatarAC = (formData: any) => async (dispatch: Dispatch<UserAction>) => {
  dispatch({ type: UserActionTypes.UPDATE_AVATAR_FETCH })
  const { data } = await updateAvatar(formData)
  const { avatar } = data
  dispatch({ type: UserActionTypes.UPDATE_AVATAR_SUCCESS, avatar })
}
