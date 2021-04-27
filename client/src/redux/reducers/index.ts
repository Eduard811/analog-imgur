import { combineReducers } from 'redux'
import { homeReducer } from './homeReducer'
import { postReducer } from './postReducer'

export const rootReducer = combineReducers({
  post: postReducer,
  home: homeReducer,
})

export type RootState = ReturnType<typeof rootReducer>
