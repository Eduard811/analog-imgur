export interface HomeState {
  isOpen: boolean
}

export enum HomeActionTypes {
  TOGGLE_IS_OPEN = 'TOGGLE_IS_OPEN',
}

interface ToggleIsOpenAction {
  type: HomeActionTypes.TOGGLE_IS_OPEN
  payload: boolean
}

export type HomeAction = ToggleIsOpenAction
