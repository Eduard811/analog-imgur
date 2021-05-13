import { UserAction, UserActionTypes, UserState } from '../../types/user'

const initialState: UserState = {
  user: {},
  isFetch: false,
  isAuth: false,
}

export const userReducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case UserActionTypes.SET_IS_AUTH:
      const { data, isAuth } = action.payload
      const { avatar } = data
      return { ...state, user: { ...data.token, avatar }, isAuth }
    case UserActionTypes.UPDATE_AVATAR_FETCH:
      return { ...state, isFetch: true }
    case UserActionTypes.UPDATE_AVATAR_SUCCESS:
      return { ...state, user: { ...state.user, avatar: action.avatar }, isFetch: false }
    case UserActionTypes.ADD_OR_DELETE_FAVORITE_POSTS:
      return {
        ...state,
        user: { ...state.user, favoritePosts: [...action.favoritePosts] },
      }
    default:
      return state
  }
}
