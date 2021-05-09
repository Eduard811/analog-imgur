export interface HomeState {
  isOpen: boolean
  newPost: boolean
}

export enum HomeActionTypes {
  TOGGLE_IS_OPEN = 'TOGGLE_IS_OPEN',
  TOGGLE_NEW_POST = 'TOGGLE_NEW_POST',
}

interface ToggleIsOpenAction {
  type: HomeActionTypes.TOGGLE_IS_OPEN
  payload: boolean
}

interface ToggleNewPostAction {
  type: HomeActionTypes.TOGGLE_NEW_POST
  payload: boolean
}

export type HomeAction = ToggleIsOpenAction | ToggleNewPostAction
