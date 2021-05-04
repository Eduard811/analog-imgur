import { combineReducers } from 'redux'
import { homeReducer } from './homeReducer'
import { postReducer } from './postReducer'
import { userReducer } from './userReducer'

export const rootReducer = combineReducers({
  post: postReducer,
  home: homeReducer,
  user: userReducer,
})

export type RootState = ReturnType<typeof rootReducer>
