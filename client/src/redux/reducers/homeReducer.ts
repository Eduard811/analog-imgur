import { HomeAction, HomeActionTypes, HomeState } from '../../types/home'

const initialState: HomeState = {
  isOpen: false,
}

export const homeReducer = (state = initialState, action: HomeAction) => {
  switch (action.type) {
    case HomeActionTypes.TOGGLE_IS_OPEN:
      return { ...state, isOpen: action.payload }
    default:
      return state
  }
}
