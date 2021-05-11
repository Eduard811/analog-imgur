import { HomeAction, HomeActionTypes, HomeState } from '../../types/home'

const initialState: HomeState = {
  isOpen: false, //sidebar
  newPost: false, //modal
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
}

export const homeReducer = (state = initialState, action: HomeAction) => {
  switch (action.type) {
    case HomeActionTypes.TOGGLE_IS_OPEN:
      return { ...state, isOpen: action.payload }
    case HomeActionTypes.TOGGLE_NEW_POST:
      return { ...state, newPost: action.payload }
    default:
      return state
  }
}
