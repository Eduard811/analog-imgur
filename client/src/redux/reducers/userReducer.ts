import { UserAction, UserActionTypes, UserState } from '../../types/user'

const initialState: UserState = {
  user: {},
  isAuth: false,
}

export const userReducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case UserActionTypes.SET_IS_AUTH:
      const { data, isAuth } = action.payload
      return { ...state, user: { ...data }, isAuth }
    default:
      return state
  }
}
