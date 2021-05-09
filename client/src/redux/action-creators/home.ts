import { Dispatch } from 'redux'
import { HomeAction, HomeActionTypes } from '../../types/home'

export const toggleIsOpen = (isOpen: boolean) => (dispatch: Dispatch<HomeAction>) => {
  dispatch({ type: HomeActionTypes.TOGGLE_IS_OPEN, payload: isOpen })
}

export const toggleNewPost = (newPost: boolean) => (dispatch: Dispatch<HomeAction>) => {
  dispatch({ type: HomeActionTypes.TOGGLE_NEW_POST, payload: newPost })
}
